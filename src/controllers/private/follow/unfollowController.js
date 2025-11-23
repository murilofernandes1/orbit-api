import express from "express";
import { PrismaClient } from "../../../generated/prisma/index.js";
const prisma = new PrismaClient();
const router = express.Router({ mergeParams: true });

router.delete("/", async (req, res) => {
  const userId = req.userId;
  const userToUnfollow = req.params.id;
  if (!userId) {
    return res
      .status(404)
      .json({ message: "Usuário não existe ou não está autenticado" });
  }
  try {
    await prisma.follow.delete({
      where: {
        followerId_followedId: {
          followerId: userId,
          followedId: userToUnfollow,
        },
      },
    });
    return res
      .status(200)
      .json({ message: "Você deixou de seguir o usuário com sucesso." });
  } catch (error) {
    res
      .status(200)
      .json({ message: "Não foi possível deixar de seguir o usuário" });
    console.log(error);
    return;
  }
});

export default router;
