import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comment: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
    },
});

const etablishmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    langitude: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    foods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
        },
    ],
    reviews: [
        reviewSchema
    ],
    isOpened: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

const Etablishment = mongoose.model("Etablishment", etablishmentSchema);

export default Etablishment;