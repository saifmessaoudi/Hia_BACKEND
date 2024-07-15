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
import router from "./routes/user.routes.js";
import establishementrouter from './routes/establishement.route.js';
import foodRouter from './routes/food.routes.js';
import offerRouter from './routes/offer.route.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT;
const HOST = '0.0.0.0' ; 



app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//Database Connection
connectDB();

//Routes
app.use('/user', router);


app.get('/', (req, res) => {
    res.status(201).json("Hello World");
});
app.use(express.json());
app.use(express.static("public"));
app.use("/user", router);
app.use("/establishement", establishementrouter);
app.use("/food", foodRouter);
app.use("/offer", offerRouter);



app.listen(PORT,HOST, () => {
    console.log(`Server is running on PORT ${PORT}`);
}
);

