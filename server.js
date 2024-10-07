import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/database.config.js';
import router from "./routes/user.routes.js";
import establishementrouter from './routes/establishement.route.js';
import foodRouter from './routes/food.routes.js';
import offerRouter from './routes/offer.route.js';
import reservationRouter from './routes/reservation.route.js';
import marketrouter from './routes/market.route.js';
import { initializeSocket } from './utils/SocketConfig.js'; // Import the initialize function

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3030;

// Database Connection
connectDB();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/user", router);
app.use("/establishement", establishementrouter);
app.use("/food", foodRouter);
app.use("/offer", offerRouter);
app.use("/reservation", reservationRouter);
app.use("/market", marketrouter);

app.get('/', (req, res) => {
    res.status(200).json("Hello World");
});

// Initialize the HTTP server
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

// Initialize Socket.IO with the server
initializeSocket(server);
