import { Router } from "express";
import { addReservation , getReservationByUserID } from "../controllers/reservation.controller.js";

const reservationRouter = Router();

reservationRouter.post("/addReservation", addReservation);
reservationRouter.get("/getReservationByUserID/:userId", getReservationByUserID);

export default reservationRouter; 