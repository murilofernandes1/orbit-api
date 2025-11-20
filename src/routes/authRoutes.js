import express from "express";
import registerController from "../controllers/public/auth/registerController.js";
import loginController from "../controllers/public/auth/loginController.js";
const router = express.Router();

router.use("/register", registerController);
router.use("/login", loginController);

export default router;
