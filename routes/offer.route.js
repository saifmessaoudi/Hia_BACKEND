import { Router } from "express";
import { addOffer,getAllOffers } from "../controllers/offer.controler.js";

const offerRouter = Router();

offerRouter.post("/add", addOffer);
offerRouter.get("/getAll", getAllOffers);

export default offerRouter;