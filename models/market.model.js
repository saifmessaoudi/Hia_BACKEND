import mongoose from "mongoose";


const marketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    
    
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    
    
    isOpened: {
        type: Boolean,
        default: true,
    },
}, {
   
});

const Market = mongoose.model("Market", marketSchema);

export default Market ;