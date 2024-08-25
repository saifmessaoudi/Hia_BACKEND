import Etablishment from "../models/etablishment.model.js";
import Food from "../models/food.model.js";
import Reservation from "../models/reservation.model.js";
import User from "../models/user.model.js";
import Offer from "../models/offer.model.js";


export const addReservation = async (req, res) => {
    try {
        const { userId, items, etablishmentId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const etablishment = await Etablishment.findById(etablishmentId);
        if (!etablishment) {
            return res.status(404).json({ error: "Etablishment not found" });
        }

        let totalPrice = 0;

        for (const item of items) {
            let product;
            if (item.type === 'food') {
                product = await Food.findById(item.food);
                if (!product) {
                    return res.status(404).json({ error: "Food not found" });
                }
                if (!product.isAvailable) {
                    return res.status(400).json({ error: "Food not available" });
                }
            } else if (item.type === 'offer') {
                product = await Offer.findById(item.offer);
                if (!product) {
                    return res.status(404).json({ error: "Offer not found" });
                }
                if (!product.isAvailable) {
                    return res.status(400).json({ error: "Offer not available" });
                }
            } else {
                return res.status(400).json({ error: "Invalid item type" });
            }
            totalPrice += product.price * item.quantity;
        }

        const code = Date.now().toString().slice(-4);
        const codeR = 'RES-' + code;
        const newReservation = new Reservation({
            user: user,
            codeReservation: codeR,
            items: items,
            totalPrice: totalPrice,
            status: "Pending",
            etablishment: etablishment,
            date: new Date()
        });

        await newReservation.save();

        res.status(201).json({ reservation: newReservation });

    } catch (error) {
        console.error("Error adding reservation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getReservationByUserID = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        let reservations = await Reservation.find({ user: userId }).populate("etablishment");

        reservations = await Reservation.populate(reservations, [
            { path: 'items.food', model: 'Food' },
            { path: 'items.food.reviews'  },
            { path: 'items.offer', model: 'Offer' }
        ]);

        res.status(200).json(reservations);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
