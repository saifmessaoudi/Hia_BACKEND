import twilio from 'twilio';
import sendEmail from './mailer.js';

//const accountSid = process.env.TWILIO_ACCOUNT_SID;
//const authToken = process.env.TWILIO_AUTH_TOKEN;

//const client = twilio(accountSid, authToken);

const otpMemoryStore = {};
const emailOptMemoryStore = {};

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); 
};

const sendOTP = (phoneNumber, otp) => {
    return client.messages.create({
        body: `Hia Application - Your verification code is ${otp}`,
        to: phoneNumber,
        from: twilioPhoneNumber
    });
};
const sendOTPEmail = async (email, otp) => {
    const subject = 'Your OTP Code';
    const html = `<p>Your verification code is <strong>${otp}</strong></p>`;
    await sendEmail(email, subject, html);
    emailOptMemoryStore[email] = {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000
    };
};

const verifyEmailOtp = (email, otp) => {
    const record = emailOptMemoryStore[email];
    if (!record) {
        return false;
    }
 
    if (record.otp != otp) {
        return false;
    }
    
    return true;
};



const verifyOTP = (phoneNumber, otp) => {
    const record = otpMemoryStore[phoneNumber];
    if (!record) {
        return false;
    }
    if (record.expiresAt < Date.now()) {
        delete otpMemoryStore[phoneNumber]; 
        return false;
    }
    if (record.otp !== otp) {
        return false;
    }
    return true;
};

export { generateOTP, sendOTP, verifyOTP,sendOTPEmail , verifyEmailOtp , emailOptMemoryStore , otpMemoryStore };