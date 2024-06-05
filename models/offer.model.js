import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    description : {
        type: String,
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
    remise : {
        type: Number,
        required: true,
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
}, {
    timestamps: true,
});

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;