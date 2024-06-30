import { Router } from "express";
import { registerUser,loginUser , facebookLogin} from '../controllers/authController.js';
import {updateUserProfile,updatelocation,verifEmail,getUserById} from '../controllers/userController.js';
import userController from "../controllers/user.controller.js";

import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { body } from 'express-validator';
import Validate from "../middleware/validate.js";

const router = Router();
router.post('/register', [
    body('firstName').not()
    .isEmpty()
    .withMessage("Your first name is required")
    .trim(),
    body('lastName').not()
    .isEmpty()
    .withMessage("Your last name is required")
    .trim(),
    body('email').isEmail().withMessage("Enter a valid email address"),
    body('password').notEmpty()
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 chars long")
],Validate,registerUser);
router.post('/login', loginUser);
router.put('/updateprofile',updateUserProfile) ;
router.put('/updatelocation',updatelocation) ;
router.post("/send-email", userController.sendEmail);
router.post("/verify-otp-email", userController.verifyOtpEmail);
router.post("/verify-otp-phone", userController.verifyOtpPhone);
router.post("/change-password", userController.changePassword);
router.post("/facebook-login", facebookLogin);
router.post("/send-phone-otp", userController.sendPhoneOtp);
router.get('/verifEmail',verifEmail) ; 
router.post('/getuserbyid', getUserById);
router.post('/chooseFoodPreference', userController.chooseFoodPreference);
export default router;