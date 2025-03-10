import mongoose from "mongoose";

const produitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom du produit est requis"],
      trim: true, 
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Le prix du produit est requis"],
      min: [0, "Le prix ne peut pas être négatif"],
    },
    image: {
      type: String,
      trim: true,
    },
    category: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Une catégorie est requise"], 
      },
    
    market: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Market",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    remise: {
      type: Number,
      default: 0,
      min: [0, "La remise ne peut pas être négative"],
      max: [100, "La remise ne peut pas dépasser 100%"], 
    },
    remiseDeadline: {
      type: Date,
    },
  },
  
);

const Product = mongoose.model("Product", produitSchema);
export default Product;
