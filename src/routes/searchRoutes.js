import express from "express";
import searchUsersController from "../controllers/private/search/searchUsersController.js";
import seeProfileController from "../controllers/private/search/seeProfileController.js";
const router = express.Router({ mergeParams: true });

router.use("/user", searchUsersController);
router.use("/profile", seeProfileController);

export default router;
