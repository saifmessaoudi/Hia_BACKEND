import userController from "../controllers/user.controller.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/send-email", userController.sendEmail);
userRouter.post("/verify-otp-email", userController.verifyOtpEmail);

export default userRouter;