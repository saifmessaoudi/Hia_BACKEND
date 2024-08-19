import { Router } from "express";
import { addReservation } from "../controllers/reservation.controller.js";

const reservationRouter = Router();

reservationRouter.post("/addReservation", addReservation);

export default reservationRouter;