import express from "express";
import { PrismaClient } from "../../../generated/prisma/index.js";

const router = express.Router({ mergeParams: true });
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(404)
        .json({ message: "Usuário não autenticado ou não existe." });
    }
    const userFollowed = req.params.id;
    if (!userFollowed) {
      return res.status(404).json({ message: "O usuário não existe." });
    }
    if (userFollowed == userId) {
      return res
        .status(401)
        .json({ message: "Você não pode seguir a si mesmo." });
    }
    await prisma.follow.create({
      data: {
        followedId: userFollowed,
        followerId: userId,
      },
    });
    res.status(200).json({ message: "Usuário seguido com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Não foi possível seguir o usuário" });
    console.log(error);
    return;
  }
});

export default router;
