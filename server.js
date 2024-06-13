import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/database.config.js';
import User from './models/user.model.js';
import Reservation from './models/reservation.model.js';
import Etablishment from './models/etablishment.model.js';
import Food from './models/food.model.js';
import Category from './models/category.model.js';
import userRouter from './routes/user.route.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//Database Connection
connectDB();

//Routes
app.use('/user', userRouter);


app.get('/', (req, res) => {
    res.status(201).json("Hello World");
});

app.post('/token', async (req, res) => {
    const { accessToken } = req.body;
    try {
        console.log('Access Token:', accessToken);
        // Send the access token to Facebook API to get user data
        // Make sure to replace 'your_access_token' with the actual access token
        const response = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`);
        const userData = await response.json();
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching user data from Facebook:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
}
);

