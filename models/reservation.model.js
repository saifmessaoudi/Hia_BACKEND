import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    codeReservation: {
        type: String,
        required: true,
    },
    items: [
        {
            type: {
                type: String,
                required: true,
                enum: ['food', 'offer'],
            },
            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food",
            },
            offer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Offer",
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
    totalPrice: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    status: {
        type: String,
    },
    etablishment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Etablishment",
    },
    date: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;