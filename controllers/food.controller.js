import Food from "../models/food.model.js";

export const addTestFood = async (req, res) => {
    try {
        const food = new Food({
        name: "Makloub Escalope",
        description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        price: 12,
        image: "images/product3.png",
        category: ["Restaurant"],
        etablishment: "6697fb3bde7092641e549102",
        reviews: [],
        averageRating: 2,
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
        const foods = await Food.find().select("-__v").populate("etablishment");
        res.status(200).json(foods);
    } catch (error) {
        console.error("Error fetching foods:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};