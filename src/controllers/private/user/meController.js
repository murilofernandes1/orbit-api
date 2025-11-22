import express from "express";
import { PrismaClient } from "../../../generated/prisma/index.js";
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res
      .status(404)
      .json({ message: "Usuário não existe ou não está autenticado." });
  }
  try {
    const user = await prisma.user.findUnique(
      {
        where: {
          id: userId,
        },
        include: { posts: true, likes: true, comments: true, replies: true },
      },
      { omit: { password: true } }
    );
    res.status(200).json(user);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Não foi possível carregar o usuário." });
    return;
  }
});
export default router;
