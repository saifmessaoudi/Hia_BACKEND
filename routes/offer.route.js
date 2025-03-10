import { Router } from "express";
import { addOffer,getAllOffers,getOffersByEstablishmentID, updateOffer,deleteOffer } from "../controllers/offer.controler.js";
import {deleteOfferById ,decrementQuantityOfferById} from "../controllers/offer.controler.js";

const offerRouter = Router();

offerRouter.post("/add", addOffer);
offerRouter.get("/getAll", getAllOffers);
offerRouter.post("/getByEstablishmentID/:id", getOffersByEstablishmentID);
offerRouter.put("/update/:id", updateOffer);
offerRouter.delete("/delete/:id", deleteOffer);
offerRouter.put("/decrementQuantityOfferById/:id", decrementQuantityOfferById);
offerRouter.delete("/deleteOfferById/:id", deleteOfferById);


export default offerRouter;