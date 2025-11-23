import express from "express";
import followController from "../controllers/private/follow/followController.js";
import unfollowController from "../controllers/private/follow/unfollowController.js";
const router = express.Router({ mergeParams: true });

router.use("/:id", followController);
router.use("/:id", unfollowController);

export default router;
