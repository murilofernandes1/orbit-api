import express from "express";
import createPost from "../controllers/private/post/createPost.js";

const router = express.Router();

router.use("/", createPost);

export default router;
