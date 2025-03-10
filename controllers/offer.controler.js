import Offer from "../models/offer.model.js";

export const addOffer = async (req, res) => {
    //add 7 days to today
    const today = new Date();


    try {
        const offer = new Offer({
            name: "Box Surprise 2025",
            description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum,",
            image: "https://glovo.dhmedia.io/image/menus-glovo/products/f1e527b64386ab720591aee4e51bff7d9c862eb77fe68a8ea05d9134684e5cc5?t=W3siYXV0byI6eyJxIjoibG93In19LHsicmVzaXplIjp7IndpZHRoIjo2MDB9fV0=",
            food: [],
            etablishment: "670e79f91df984f66184488d",
            remise: 20,
            validFrom: today,
            validUntil: new Date(today.getTime() + 1 * 60 * 60 * 1000),
            isAvailable: true,
            quantity: 10,
            price: 100,
            newPrice: 80,
            note: "This is a note",
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
      const offers = await Offer.find()
        .select("-__v")
        .populate("etablishment")
        .sort({ validUntil: 1 });
  
      res.status(200).json(offers);
    } catch (error) {
      console.error("Error fetching offers:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

export const updateOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(offer);
    } catch (error) {
        console.error("Error updating offer:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteOffer = async (req, res) => {
    try {
         const box = await Offer.findById(req.params.id);
        if (!box) {
            return res.status(404).json({ error: "Offer not found" });
        }
        if (box.isAvailable) {
            return res.status(400).json({ error: "Offer is still available" });
        }
        await Offer.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Offer deleted successfully" });
    } catch (error) {
        console.error("Error deleting offer:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


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
export const deleteOfferById = async (req, res) => {
    try {
      const offerId = req.params.id;
      const deletedOffer = await Offer.findByIdAndDelete(offerId);
  
      if (!deletedOffer) {
        return res.status(404).json({ error: "Offer not found" });
      }
  
      res.status(200).json({ message: "Offer deleted successfully", deletedOffer });
    } catch (error) {
      console.error("Error deleting offer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  export const decrementQuantityOfferById = async (req, res) => {
    try {
      const offerId = req.params.id;
      const offer = await Offer.findById(offerId);
  
      if (!offer) {
        return res.status(404).json({ error: "Offer not found" });
      }
  
      if (offer.quantity > 0) {
        offer.quantity--;
        await offer.save();
        return res.status(200).json({ message: "Quantity updated successfully", offer });
      } else {
        return res.status(400).json({ error: "Quantity is already at zero" });
      }
  
    } catch (error) {
      console.error("Error updating offer:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
