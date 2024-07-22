import Food from "../models/food.model.js";

export const addTestFood = async (req, res) => {
    try {
        const food = new Food({
        name: "Salade César",
        description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        price: 12.5,
        image: "https://images.deliveryhero.io/image/menus-glovo/products/a5685e88a6553b0a467db042fba94afccaeb72a9b209479f937e87db54a34e79?t=W3siYXV0byI6eyJxIjoibG93In19LHsicmVzaXplIjp7IndpZHRoIjo2MDB9fV0=",
        category: ["Restaurant"],
        etablishment: "669801a94706454682c1ac39",
        reviews: [],
        averageRating: 4,
        ingredients: ["Escalope", "Laitue", "Tomate","Sauce"],
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