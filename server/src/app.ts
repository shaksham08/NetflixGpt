import express from "express";
import userRouter from "./routes/user";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(limiter);

// routers
app.use("/user", userRouter);

export default app;
