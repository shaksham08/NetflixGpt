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
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

// export const resetPassword = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       throw new ApiError(400, "User not found");
//     }

//     const token = crypto.randomBytes(20).toString("hex");
//   } catch (err) {
//     console.log(err);
//   }
// };
