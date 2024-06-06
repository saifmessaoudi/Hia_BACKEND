import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import generateVerificationToken from './generateVerificationToken.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const {firstName,lastName, password, email} = req.body;

        
        const existing = await User.findOne({ email });

        if ( existing) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const authToken = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        const verificationToken = generateVerificationToken();
        newUser.verificationToken = verificationToken;
        await newUser.save();

        

        res.status(200).json({ user: newUser, authToken, message: 'User registered successfully. Please check your SMS for verification.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};