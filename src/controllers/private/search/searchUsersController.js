import express from "express";
import { PrismaClient } from "../../../generated/prisma/index.js";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    const user = await prisma.user.findMany({
      where: {
        name: {
          contains: String(name),
          mode: "insensitive",
        },
      },
      omit: { password: true, email: true },
    });
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});
export default router;
