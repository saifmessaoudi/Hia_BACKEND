import { Router } from "express";
import { addOffer,getAllOffers,getOffersByEstablishmentID } from "../controllers/offer.controler.js";

const offerRouter = Router();

offerRouter.post("/add", addOffer);
offerRouter.get("/getAll", getAllOffers);
offerRouter.post("/getByEstablishmentID/:id", getOffersByEstablishmentID);

export default offerRouter;