import express from "express";
import createPostController from "../controllers/private/post/createPostController.js";
import seePostsController from "../controllers/private/post/seePostsController.js";
import followingPostsController from "../controllers/private/post/followingPostsController.js";
const router = express.Router();

router.use("/", createPostController);
router.use("/", seePostsController);
router.use("/following", followingPostsController);

export default router;
