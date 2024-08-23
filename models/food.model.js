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

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        
    },
    image: {
        type: String,
    },
    category: [
        {
            type: String,
        }
    ],
    etablishment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Etablishment",
    },
    reviews: [
        reviewSchema
    ],
    averageRating: {
        type: Number,
        default: 0,
    },
    ingredients: [
        {
            type: String,
        }
    ],
    isAvailable: {
        type: Boolean,
        default: true,
    },
    remise : {
        type: Number,
        default: 0,
    },
    remiseDeadline : {
        type: Date,
    },

}, {
    timestamps: true,
});

const Food = mongoose.model("Food", foodSchema);



export default Food;