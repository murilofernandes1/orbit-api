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
    const followed = await prisma.follow.findMany({
      where: { followerId: userId },
    });

    const followedIds = followed.map((f) => f.followedId);

    if (followedIds.length === 0) {
      return res.status(200).json([]);
    }

    const followedPosts = await prisma.post.findMany({
      where: {
        userId: { in: followedIds },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(followedPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao carregar feed." });
  }
});

export default router;
