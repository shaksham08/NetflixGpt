import express from "express";
import userRouter from "./routes/user";
import cors from "cors";
import { limiter } from "./middlewares/rateLimiter";
import cookieParser from "cookie-parser";
import tmdbRouter from "./routes/tmdb";

const app = express();

// middlewares

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ must match frontend
    credentials: true, // ✅ allow cookies to be sent
  })
);
app.use(limiter);
app.use(cookieParser());

// routers
app.use("/user", userRouter);
app.use("/media", tmdbRouter);

export default app;
