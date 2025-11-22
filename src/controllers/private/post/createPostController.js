import express from "express";
import { PrismaClient } from "../../../generated/prisma/index.js";
const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  const userId = req.userId;
  const post = req.body;
  try {
    if (!userId) {
      return res
        .status(404)
        .json({ message: "Usuário não existe ou não está autenticado." });
    }

    const createPost = await prisma.post.create({
      data: {
        userId: userId,
        title: post.title,
        body: post.body,
        image: post.image,
      },
    });
    return res.status(200).json({ message: "Post criado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Não foi possivel criar o post" });
    console.log(error);
    return;
  }
});
export default router;
