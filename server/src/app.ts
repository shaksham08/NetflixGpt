import express from "express";
// import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/user";

const app = express();
// const prisma = new PrismaClient();

app.use(express.json());

app.use("/user", userRouter);

// app.get("/", async (_: express.Request, res: express.Response) => {
//   try {
//     const users = await prisma.user.findMany();

//     res.json({ users });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

export default app;
