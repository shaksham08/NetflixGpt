import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";

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
