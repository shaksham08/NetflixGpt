import { Request, Response } from "express";
import {
  login as loginService,
  signup as signupService,
  resetPassword as resetPasswordService,
  validateResetToken as validateResetTokenService,
  updatePassword as updatePasswordService,
} from "../services/userService";
import { ApiError } from "../utils/ApiError";
import {
  validateLoginInput,
  validateSignupInput,
  validateUpdatePasswordInput,
} from "../validators/userValidator";
import config from "../config/config";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = validateLoginInput(req.body);
    const result = await loginService(email, password);
    res.cookie("netflix_id", result.token, {
      httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
      secure: config.nodeEnv === "production", // Sends the cookie only over HTTPS
    });
    res.json(result);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = validateSignupInput(req.body);
    const result = await signupService(email, password, name);
    res.cookie("netflix_id", result.token, {
      httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
      secure: config.nodeEnv === "production", // Sends the cookie only over HTTPS
    });
    res.json(result);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await resetPasswordService(email);
    res.status(200).json({
      message: "Password reset instructions have been sent to your email",
    });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const validateResetToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    await validateResetTokenService(token);
    res.json({ message: "Token is valid" });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = validateUpdatePasswordInput(req.body);
    await updatePasswordService(token, password);
    res.json({ message: "Password updated successfully" });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
