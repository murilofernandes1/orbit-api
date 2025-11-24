import express from "express";
import searchUsersController from "../controllers/private/search/searchUsersController.js";
const router = express.Router({ mergeParams: true });

router.use("/user", searchUsersController);

export default router;
