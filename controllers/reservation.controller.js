import Etablishment from "../models/etablishment.model.js";
import Food from "../models/food.model.js";
import Reservation from "../models/reservation.model.js";
import User from "../models/user.model.js";
import Offer from "../models/offer.model.js";
import Product from "../models/product.model.js";
import Market from "../models/market.model.js";
import mongoose from 'mongoose';
import { io } from "../utils/SocketConfig.js"; // Ensure this is correct

export const addReservation = async (req, res) => {
    try {
        const { userId, items, etablishmentId } = req.body;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId" });
        }

        // Validate etablishmentId
        if (etablishmentId && !mongoose.Types.ObjectId.isValid(etablishmentId)) {
            return res.status(400).json({ error: "Invalid etablishmentId or marketId" });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Fetch establishment or market
        const etablishment = etablishmentId ? await Etablishment.findById(etablishmentId) : null;
        const market = !etablishment && etablishmentId ? await Market.findById(etablishmentId) : null;

        if (!etablishment && !market) {
            return res.status(404).json({ error: "Etablishment or Market not found" });
        }

        let totalPrice = 0;

        // Process items and calculate total price
        for (const item of items) {
            let product;

            // Validate item type and fetch product
            switch (item.type) {
                case 'food':
                    product = await Food.findById(item.food);
                    break;
                case 'offer':
                    product = await Offer.findById(item.offer);
                    break;
                case 'product':
                    product = await Product.findById(item.product);
                    break;
                default:
                    return res.status(400).json({ error: "Invalid item type" });
            }

            // Check if product exists and is available
            if (!product) {
                return res.status(404).json({ error: `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} not found` });
            }
            if (!product.isAvailable) {
                return res.status(400).json({ error: `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} not available` });
            }

            totalPrice += product.price * item.quantity;
        }

        // Create reservation
        const code = Date.now().toString().slice(-4);
        const codeR = 'RES-' + code;

        const newReservation = new Reservation({
            user: userId,
            codeReservation: codeR,
            items: items,
            totalPrice: totalPrice,
            status: "Pending",
            etablishment: etablishment ? etablishment._id : undefined,
            market: market ? market._id : undefined,
            date: new Date(),
        });
        await newReservation.save();

        // Emit the reservation to the appropriate channel
        if (market) {
            io.to(market._id.toString()).emit('newReservation', newReservation);
            console.log(`Reservation sent to market channel ${market._id}`);
            console.log(newReservation.items);
        } else if (etablishment) {
            io.to(etablishment._id.toString()).emit('newReservation', newReservation);
            console.log(`Reservation sent to etablishment channel ${etablishment._id}`);
        }

        res.status(201).json({ reservation: newReservation });

    } catch (error) {
        console.error("Error adding reservation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getReservationByUserID = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Fetch reservations by user
        let reservations = await Reservation.find({ user: userId });

        // If there are no reservations, return an empty array
        if (reservations.length === 0) {
            return res.status(200).json([]);
        }

        // Populate reservations
        reservations = await Reservation.populate(reservations, [
            {
                path: 'etablishment',
                model: 'Etablishment',
            },
            {
                path: 'market',
                model: 'Market',
            },
            { path: 'items.food', model: 'Food' },
            { path: 'items.offer', model: 'Offer' },
            { path: 'items.product', model: 'Product' },
            { path: 'items.food.reviews' }
        ]);

        // Send the populated reservations back
        res.status(200).json(reservations);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


