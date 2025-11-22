import express from "express";
import meController from "../controllers/private/user/meController.js";
import myPostsController from "../controllers/private/user/myPostsController.js";
const router = express();

router.use("/posts", myPostsController);
router.use("/", meController);
export default router;
