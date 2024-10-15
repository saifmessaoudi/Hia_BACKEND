import Offer from "../models/offer.model.js";

export const addOffer = async (req, res) => {
    //add 7 days to today
    const today = new Date();
    

    try { 
    const offer = new Offer({
        name : "Box 2024",
        description : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum,",
        image : "https://glovo.dhmedia.io/image/menus-glovo/products/f1e527b64386ab720591aee4e51bff7d9c862eb77fe68a8ea05d9134684e5cc5?t=W3siYXV0byI6eyJxIjoibG93In19LHsicmVzaXplIjp7IndpZHRoIjo2MDB9fV0=",
        food : [],
        etablishment : "66fefb026d14b65668ab5d9b",
        remise : 20,
        validFrom : today,
        validUntil : today.setDate(today.getDate() + 3),
        isAvailable : true,
        quantity : 10,
        price : 60
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