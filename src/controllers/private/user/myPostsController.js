import express from "express";
import { PrismaClient } from "../../../generated/prisma/index.js";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res
      .status(404)
      .json({ message: "Usuário não existe ou não está autenticado" });
  }
  try {
    const myPosts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { id: userId },
    });
    if (!myPosts) {
      return res
        .status(404)
        .json({ message: "Você ainda não tem nenhum post" });
    }
    return res.status(200).json(myPosts);
  } catch (error) {
    res.status(500).json({ message: "Não foi possível carregar seus posts." });
    console.log(error);
  }
});

export default router;
