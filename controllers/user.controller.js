import nodemailer from 'nodemailer';
import { sendOTP, sendOTPEmail, verifyOTP } from '../utils/otpUtils.js';
import { generateOTP , verifyEmailOtp } from '../utils/otpUtils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';




const sendEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const otp = generateOTP();
        sendOTPEmail(email, otp);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const verifyOtpEmail = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const isVerified = verifyEmailOtp(email, otp);
        if (isVerified) {
            res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const verifyOtpPhone = async (req, res) => {
    const { phone, otp } = req.body;
    try {
        const isVerified = verifyOTP(phone, otp);
        if (isVerified) {
            res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const changePassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne ({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
       
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const sendPhoneOtp = async (req, res) => {
  const {email} = req.body;
  const {phone} = req.body;
    try {
        const otp = generateOTP();
        console.log(otp);
        const user = await User.findOne ({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
         user.phone = phone;
        await user.save();
        sendOTP(96887940, otp);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default { sendEmail, verifyOtpEmail , changePassword, sendPhoneOtp,verifyOtpPhone};