import express from "express";
import meController from "../controllers/private/user/meController.js";
const router = express();

router.use("/", meController);
export default router;
