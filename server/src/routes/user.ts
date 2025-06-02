import { PrismaClient } from "@prisma/client";
import express, { Router } from "express";
import bcrypt from "bcrypt";

const userRouter = Router();

const prisma = new PrismaClient();

userRouter.post(
  "/login",
  async (req: express.Request, res: express.Response) => {
    try {
      const { email = "", password = "" } = req.body;

      if (!email || !password) {
        res.status(400).json({
          error: "Email or password not provided",
        });
        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        res.status(400).json({
          error: "User not found",
        });
        return;
      }

      // verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({
          error: "Invalid password",
        });
        return;
      }

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
);

userRouter.post(
  "/signup",
  async (req: express.Request, res: express.Response) => {
    try {
      const { email = "", password = "", name = "" } = req.body;

      if (!email || !password) {
        res.status(400).json({
          error: "Email, password or name not provided",
        });
        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        res.status(400).json({
          error: "User already exist",
        });
        return;
      }

      const hashedPassowrd = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassowrd,
          name,
        },
      });

      res.json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
);

export default userRouter;
