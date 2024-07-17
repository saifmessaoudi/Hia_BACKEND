import Offer from "../models/offer.model.js";

export const addOffer = async (req, res) => {
    //add 7 days to today
    const today = new Date();
    

    try { 
    const offer = new Offer({
        name : "Amazing Box",
        description : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum,",
        image : "test",
        food : [],
        etablishment : "6697fb3bde7092641e549102",
        remise : 10,
        validFrom : today,
        validUntil : today.setDate(today.getDate() + 3),
        isAvailable : true,
        quantity : 3,
        price : 20
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
        const offers = await Offer.find().select("-__v").populate("etablishment");
        res.status(200).json(offers);
    } catch (error) {
        console.error("Error fetching offers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getOffersByEstablishmentID = async (req, res) => {




    try {
        const offers = await Offer.find({
            etablishment: req.params.id
        }).select("-__v").populate("etablishment");
        res.status(200).json(offers);
    }
    catch (error) {
        console.error("Error fetching offers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}