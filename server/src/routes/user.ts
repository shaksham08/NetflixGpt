import { Router } from "express";
import {
  login,
  resetPassword,
  signup,
  validateResetToken,
  updatePassword,
} from "../controllers/userController";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/reset-password", resetPassword);
userRouter.post("/validate-reset-token", validateResetToken);
userRouter.post("/update-password", updatePassword);

export default userRouter;
