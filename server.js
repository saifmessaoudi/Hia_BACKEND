import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/database.config.js';
import User from './models/user.model.js';
import Reservation from './models/reservation.model.js';
import Etablishment from './models/etablishment.model.js';
import Food from './models/food.model.js';
import router from "./routes/user.routes.js";
import establishementrouter from './routes/establishement.route.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev'));
app.use(cors());

//Database Connection
connectDB();


app.get('/', (req, res) => {
    res.status(201).json("Hello World");
});
app.use(express.json());
app.use(express.static("public"));
app.use("/user", router);
app.use("/establishement", establishementrouter);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${3030}`);
}
);

