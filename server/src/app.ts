import express from "express";
import userRouter from "./routes/user";

const app = express();
app.use(express.json());

// routers
app.use("/user", userRouter);

export default app;
