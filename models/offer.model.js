import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    description : {
        type: String,
    },
    price : {
        type: Number,
    },
    image : {
        type: String,
    },
    food : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
        },
    ],
    etablishment : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Etablishment",
    },
    validFrom : {
        type: Date,
        required: true,
    },
    validUntil : {
        type: Date,
        required: true,
    },
    isAvailable : {
        type: Boolean,
        default: true,
    },
    quantity : {
        type : Number,
        required: true,
    }
}, {
    timestamps: true,
});

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;