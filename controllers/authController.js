import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import generateVerificationToken from './generateVerificationToken.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

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

        

        
        await newUser.save();

        

        res.status(200).json({ user: newUser, message: 'User registered successfully. Please check your SMS for verification.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validation des entrées
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
       
        const secretKey = process.env.JWT_SECRET || 'defaultSecret'; 
        const token = jwt.sign(
            {
                userId: user._id,
                token:user.JWT_KEY 
            },
            secretKey,
            { expiresIn: '1h' }
        );
        
    


        
        
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
};