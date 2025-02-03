import { Router } from "express";
import {deleteOfferById,addOffer,getAllOffers,getOffersByEstablishmentID ,decrementQuantityOfferById} from "../controllers/offer.controler.js";

const offerRouter = Router();

offerRouter.post("/add", addOffer);
offerRouter.get("/getAll", getAllOffers);
offerRouter.post("/getByEstablishmentID/:id", getOffersByEstablishmentID);
offerRouter.put("/decrementQuantityOfferById/:id", decrementQuantityOfferById);
offerRouter.delete("/deleteOfferById/:id", deleteOfferById);


export default offerRouter;