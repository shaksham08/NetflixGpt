import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import crypto from "crypto";
import { sendPasswordResetEmail } from "./emailService";

const prisma = new PrismaClient();

export const generateToken = (
  userId: string,
  email: string,
  name: string | null
): string => {
  return jwt.sign(
    { userId, email, name },
    process.env.JWT_SECRET || "fallback-secret-key",
    { expiresIn: "24h" }
  );
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password");
  }

  const token = generateToken(user.id.toString(), user.email, user.name);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export const signup = async (email: string, password: string, name: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const token = generateToken(
    newUser.id.toString(),
    newUser.email,
    newUser.name
  );

  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  };
};

export const resetPassword = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  // Delete any existing reset tokens for this user
  await prisma.passwordResetToken.deleteMany({
    where: { userId: user.id },
  });

  // Generate a secure random token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const tokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

  // Create a new password reset token
  await prisma.passwordResetToken.create({
    data: {
      token: resetToken,
      userId: user.id,
      expiresAt: tokenExpiry,
    },
  });

  // Generate reset link
  const resetLink = `${process.env.FRONTEND_URL}/update-password?token=${resetToken}`;

  // Send password reset email
  await sendPasswordResetEmail(email, resetLink);
};

export const validateResetToken = async (token: string) => {
  const resetToken = await prisma.passwordResetToken.findFirst({
    where: {
      token,
      expiresAt: {
        gt: new Date(),
      },
      used: false,
    },
  });

  if (!resetToken) {
    throw new ApiError(400, "Invalid or expired reset token");
  }

  return true;
};

export const updatePassword = async (token: string, newPassword: string) => {
  const resetToken = await prisma.passwordResetToken.findFirst({
    where: {
      token,
      expiresAt: {
        gt: new Date(),
      },
      used: false,
    },
    include: {
      user: true,
    },
  });

  if (!resetToken) {
    throw new ApiError(400, "Invalid or expired reset token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password and mark token as used
  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: {
        password: hashedPassword,
      },
    }),
    prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: {
        used: true,
      },
    }),
  ]);

  return true;
};
