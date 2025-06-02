import { Request, Response } from "express";
import {
  login as loginService,
  signup as signupService,
} from "../services/userService";
import { ApiError } from "../utils/ApiError";
import {
  validateLoginInput,
  validateSignupInput,
} from "../validators/userValidator";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = validateLoginInput(req.body);
    const result = await loginService(email, password);
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
    res.json(result);
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
