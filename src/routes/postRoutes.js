import express from "express";
import createPostController from "../controllers/private/post/createPostController.js";
import seePostsController from "../controllers/private/post/seePostsController.js";
const router = express.Router();

router.use("/", createPostController);
router.use("/", seePostsController);

export default router;
