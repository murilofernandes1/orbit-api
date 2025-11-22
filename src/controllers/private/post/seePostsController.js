import express from "express";
import { PrismaClient } from "../../../generated/prisma/index.js";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res
      .status(404)
      .json({ message: "Usuário não existe ou não está autenticado." });
  }
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: { omit: { password: true } } }, //aqui indico o campo e a ordem que eu quero que os dados apareçam, nesse caso em decrescente.
    });
    return res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Não foi possível carregar os posts" });
    console.log(error);
    return;
  }
});

export default router;
