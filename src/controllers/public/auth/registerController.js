import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../../../generated/prisma/index.js";
const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const userDB = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,
      },
    });
    const token = jwt.sign({ id: userDB.id }, JWT_SECRET, { expiresIn: "1y" });
    res.status(201).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro no servidor, tente novamente" });
  }
});
export default router;
