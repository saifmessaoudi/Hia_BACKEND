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
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    langitude: {
        type: Number,
        
    },
    latitude: {
        type: Number,
        
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    preferences: [
        {
            type: String,
        },
    ],
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