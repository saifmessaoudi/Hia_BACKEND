import Food from "../models/food.model.js";

export const addTestFood = async (req, res) => {
    try {
        const food = new Food({
        name: "Makloub",
        description: "Pizza description",
        price: 10,
        image: "images/product2.png",
        category: ["Sugar"],
        establishment: "5f6e8c5b0b7f3a5d0c3c3f5d",
        reviews: [],
        averageRating: 3,
        ingredients: ["tomato", "cheese", "dough"],
        isAvailable: true,
        remise: 0,
        remiseDeadline: new Date(),
        });
    
        await food.save();
        res.status(201).json(food);
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    }

export const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find().select("-__v");
        res.status(200).json(foods);
    } catch (error) {
        console.error("Error fetching foods:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};