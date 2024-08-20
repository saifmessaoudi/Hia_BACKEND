import Offer from "../models/offer.model.js";

export const addOffer = async (req, res) => {
    //add 7 days to today
    const today = new Date();
    

    try { 
    const offer = new Offer({
        name : "El Big Box",
        description : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum,",
        image : "https://glovo.dhmedia.io/image/stores-glovo/stores/4276c9f9ba3a3008055b064840cb511765978d31a3b4015b68862685685b803d?t=W3siYXV0byI6eyJxIjoibG93In19LHsicmVzaXplIjp7ImhlaWdodCI6MjI1fX1d",
        food : [],
        etablishment : "6697fb3bde7092641e549102",
        remise : 20,
        validFrom : today,
        validUntil : today.setDate(today.getDate() + 3),
        isAvailable : true,
        quantity : 15,
        price : 55
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