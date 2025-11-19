import express from "express";
const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = req.body;
  } catch (error) {}
});
