import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (_: express.Request, res: express.Response) => {
  try {
    await prisma.user.create({
      data: {
        name: "Alice",
        email: "shaksham@gmail.com",
      },
    });

    const users = await prisma.user.findMany();

    res.json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default app;
