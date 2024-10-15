import mongoose from "mongoose";


const produitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
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
    market: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Market",
    },
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
const Product = mongoose.model("Product", produitSchema);
export default Product;