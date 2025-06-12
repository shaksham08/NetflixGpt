import { Router } from "express";
import { login, signup } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
// userRouter.post("/reset-password", resetPassword);

export default userRouter;
