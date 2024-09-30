import mongoose from "mongoose";

const establishmentUserSchema= new mongoose.Schema({
    fullName: {
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
  
}, {
    timestamps: true,
});

const establishmentUser = mongoose.model("User Establishment", establishmentUserSchema);

export default establishmentUser;

