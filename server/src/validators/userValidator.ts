import { z } from "zod";
import { ApiError } from "../utils/ApiError";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const updatePasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const validateLoginInput = (data: unknown) => {
  try {
    return loginSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError(400, error.errors[0].message);
    }
    throw error;
  }
};

export const validateSignupInput = (data: unknown) => {
  try {
    return signupSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError(400, error.errors[0].message);
    }
    throw error;
  }
};

export const validateUpdatePasswordInput = (data: unknown) => {
  try {
    return updatePasswordSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError(400, error.errors[0].message);
    }
    throw error;
  }
};
