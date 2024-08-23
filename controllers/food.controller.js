import Food from "../models/food.model.js";
import Etablishment from "../models/etablishment.model.js";

export const addTestFood = async (req, res) => {
    try {
        const food = new Food({
        name: "Cheesecake Pistachio",
        description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        price: 18.500,
        image: "https://glovo.dhmedia.io/image/menus-glovo/products/880c7be58597c04fd435e27d98c69815c29c521f5d28d2c40bc545c5fdb3a6e4?t=W3siYXV0byI6eyJxIjoibG93In19LHsicmVzaXplIjp7IndpZHRoIjo2MDB9fV0=",
        category: ["Restaurant"],
        etablishment: "6697fb3bde7092641e549102",
        reviews: [],
        averageRating: 0,
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

    export const addFood = async (req, res) => {
        try {
            const { name, price, image, etablishment, ingredients, } = req.body;
            const food = new Food({
                name,
                description: "4 Pièces crispy chicken tenders servis avec potatoes ou frites, riz, coleslaw, salade, sauces (algérienne, mayonnaise, sauce samouraï, bbq ou ketchup) et une pièce de tortillas",
                price,
                image,
                category : ["Boulangerie"],
                etablishment,
                reviews: [],
                averageRating: 0,
                ingredients,
                isAvailable : true,
                remise : 0,
                remiseDeadline : new Date(),
            });
             //save the food to establishement
            const etabl = await Etablishment.findById(etablishment);
            etabl.foods.push(food._id);
            await etabl.save();
            await food.save();
            res.status(201).json(food);
        } catch (error) {
            console.error("Error adding food:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

export const getAllFoods = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const batch = parseInt(req.query.batch) || 10;
    const skip = (page - 1) * batch;

    try {
        const foods = await Food.find()
            .select("-__v")
            .populate("etablishment")
            .populate("reviews.user")
            .skip(skip)
            .limit(batch);

        res.status(200).json(foods);
    } catch (error) {
        console.error("Error fetching foods:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const addReview = async (req, res) => {
    try {
        const { foodID } = req.params;
        const { comment, rating,userId } = req.body;

        const food = await Food.findById(foodID);
        if (!food) {
            return res.status(404).json({ error: "Food not found" });
        }

        const review = {
            comment,
            rating,
            user: userId,
        };

        food.reviews.push(review);

        let sum = 0;

        food.reviews.forEach((review) => {
            sum += review.rating;
        });

        food.averageRating = sum / food.reviews.length;

        await food.save();

        res.status(200).json(food);    
    }catch (e){
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const getReviewByFoodID = async (req, res) => {
    try {
        const { foodID } = req.params;
        const food = await Food.findById(foodID).populate("reviews.user");
        if (!food) {
            return res.status(404).json({ error: "Food not found" });
        }
        res.status(200).json(food.reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}; 

export const getFoodByID = async (req, res) => {
    try {
        const {idFood} = req.body;
        const food = await Food.findById(idFood).populate("etablishment").populate("reviews.user");
        if (!food) {
            return res.status(404).json({ error: "Food not found" });
        }
        res.status(200).json(food);
    } catch (error) {
        console.error("Error fetching food:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

