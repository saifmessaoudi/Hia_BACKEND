import Etablishment from '../models/etablishment.model.js';
import Food from '../models/food.model.js'; 



export const getAllEtablissements = async (req, res) => {
  try {
    const etablissements = await Etablishment.find()
      .select("-__v")
      .populate({
        path: "foods",
        model: "Food", 
        populate: [
          {
            path: "etablishment",
            model: "Etablishment",
            select: "-__v"
          },
          {
            path: "reviews.user",
            model: "User", // Assuming you have a User model
            select: "firstName lastName email" // Adjust the fields as necessary
          }
        ]

      })
      .populate("reviews.user");
    res.status(200).json(etablissements);
  } catch (error) {
    console.error("Error fetching etablissements:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


  export const getEstablishmentDetail = async (req, res) => {
    const { id } = req.body; 
  
    try {
      const Etablishment = await Etablishment.findById(id).populate('foods');
      if (!Etablishment) {
        return res.status(404).json({ message: 'Etablishment not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const addEstablishment = async (req, res) => {

    try { const establishement=  new Etablishment({
      name: "Pizza Chrono",
      description: "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      langitude: 10.303640,
      latitude: 36.740130,
      address: "P8Q4+P4X, Ez Zahra",
      image : "https://lh5.googleusercontent.com/p/AF1QipNQGvoH3pYvxjCMHlAg6nOPrw6Jm7WEOM6oJSBK=w408-h306-k-no",
      phone : "99745628",
      preferences : ["Vegan", "Fast Food"],
      averageRating : 3,
      isOpened : true,
      foods : [],
      reviews : [],
    });
      await establishement.save();
      res.status(201).json(establishement);
    } catch (error) {
      console.error("Error adding etablishment:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  
  };
  export const getProductsByEstablishmentID = async (req, res) => {
    const { id } = req.body;
  
    try {
      const establishment = await Etablishment.findById(id);
      if (!establishment) {
        return res.status(404).json({ message: 'Establishment not found' });
      }
  
      const foodIds = establishment.foods;
      const foods = await Food.find({ '_id': { $in: foodIds } });
  
      res.status(200).json(foods);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  export const addFoodsToEstablishment = async (req, res) => {
    const { establishmentId, foodId } = req.body;
  
    console.log('Request body:', req.body);
  
    if (!establishmentId || !foodId) {
      return res.status(400).json({ message: 'Establishment ID and Food ID are required' });
    }
  
    try {
      const establishment = await Etablishment.findById(establishmentId);
      if (!establishment) {
        return res.status(404).json({ message: 'Establishment not found' });
      }
  
      const food = await Food.findById(foodId);
      if (!food) {
        return res.status(404).json({ message: 'Food not found' });
      }
  
      food.etablishment = establishmentId;
      await food.save();
  
      establishment.foods.push(foodId);
      await establishment.save();
  
      res.status(200).json({ food, establishment });
    } catch (error) {
      console.error('Error adding food to establishment:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };
  
  
  
