import Offer from "../models/offer.model.js";

export const addOffer = async (req, res) => {
    //add 7 days to today
    const today = new Date();
    

    try { 
    const offer = new Offer({
        name : "Box ete 2024",
        description : "test",
        image : "test",
        food : [],
        etablishment : "5ff7b3b3b3b3b3b3b3b3b3b3",
        remise : 10,
        validFrom : today,
        validUntil : today.setDate(today.getDate() + 7),
        isAvailable : true,
        quantity : 0
    });
      await offer.save();
      res.status(201).json(offer);
    } catch (error) {
      console.error("Error adding offer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  
  };

  export const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find().select("-__v");
        res.status(200).json(offers);
    } catch (error) {
        console.error("Error fetching offers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};