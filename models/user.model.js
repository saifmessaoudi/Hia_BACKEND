import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    profileImage: {
        type: String,
    },
    address: {
        type: String,
    },
    langitude : {
        type: String,
    },
    latitude : {
        type: String,
    },
    favoriteFood: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
        }
    ],
    foodPreference: [
        {
            type : String,
        }
    ],
    resetVerificationToken : { type: String},
    verificationToken: { type: String, index: true, unique: true, sparse: true },


}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;

