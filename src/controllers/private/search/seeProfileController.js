import express from "express";
import { PrismaClient } from "../../../generated/prisma/index.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/:id", async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  if (!userId) {
    return res
      .status(404)
      .json({ message: "Usuário não autenticado ou não existe" });
  }
  try {
    const seeUser = await prisma.user.findUnique({
      where: { id: id },
      include: {
        posts: true,
        followers: true,
        comments: true,
        following: true,
      },
      omit: { password: true, email: true },
    });
    return res.status(200).json(seeUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Não foi possível ver o perfil do usuário" });
    console.log(error);
  }

  return;
});
export default router;
