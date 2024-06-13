import nodemailer from 'nodemailer';
import { sendOTPEmail } from '../utils/otpUtils.js';
import { generateOTP , verifyEmailOtp } from '../utils/otpUtils.js';



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

export default { sendEmail, verifyOtpEmail };