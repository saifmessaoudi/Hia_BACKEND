import Etablishment from "../models/etablishment.model.js";
import Food from "../models/food.model.js";
import Reservation from "../models/reservation.model.js";
import User from "../models/user.model.js";


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


        let totalPrice = 0

        for (const item of items ){
            const food = await Food.findById(item.food);
            if (!food) {
                return res.status(404).json({ error: "Food not found" });
            }
            if (!food.isAvailable) {
                return res.status(400).json({ error: "Food not available" });
            }
            totalPrice += food.price * item.quantity;
        }

        
        const code =  Date.now().toString().slice(-4);
        const codeR = 'RES-' + code;
        const newReservation = new Reservation({
             user : user ,
             codeReservation : codeR,
                items : items,
                totalPrice : totalPrice,
                status : "Pending",
                etablishment : etablishment,
                date: new Date()
        })

        await newReservation.save();

        res.status(201).json({ reservation: newReservation });

    }
    catch (error){
        console.error("Error adding reservation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getReservationByUserID = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById (userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const reservations = await Reservation.find({ user: userId }).populate("etablishment").populate("items.food").populate("items.food.reviews");
        res.status(200).json(reservations);
    }
    catch (error){
        console.error("Error fetching reservations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
