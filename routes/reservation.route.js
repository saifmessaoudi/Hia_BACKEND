import { Router } from "express";
import { addReservation , getReservationByUserID,getReservationByEtablishmentID } from "../controllers/reservation.controller.js";

const reservationRouter = Router();

reservationRouter.post("/addReservation", addReservation);
reservationRouter.get("/getReservationByUserID/:userId", getReservationByUserID);
reservationRouter.get("/getReservationByEtablishmentID/:etablishmentId", getReservationByEtablishmentID);

export default reservationRouter; 