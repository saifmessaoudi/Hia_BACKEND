import Etablishment from '../models/etablishment.model.js';
import Food from '../models/food.model.js'; 
import bcrypt from 'bcrypt';



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
      const etablishment = await Etablishment.findById(id).populate('foods');
      if (!etablishment) {
        return res.status(404).json({ message: 'Etablishment not found' });
      }
  
      res.status(200).json(etablishment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export const addEstablishment = async (req, res) => {
      const { name, description, langitude, latitude, address, image, email, password } = req.body;
  
      try {
          // Check if the establishment already exists
          const existing = await Etablishment.findOne({ email });
          if (existing) {
              return res.status(400).json({ message: "Establishment already exists" });
          }
  
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
  
          // Create a new establishment
          const etablishment = new Etablishment({
              name,
              description,
              langitude,
              latitude,
              address,
              image,
              email,
              password: hashedPassword,
              phone: "99745628",
              preferences: ["Sugar"],
              averageRating: 0,
              isOpened: true,
              foods: [],
              reviews: [],
          });
  
          // Save the establishment
          await etablishment.save();
  
          // Respond with the created establishment
          res.status(201).json({ etablishment, message: 'Establishment registered and added successfully. Please check your email for verification.' });
      } catch (error) {
          console.error("Error adding or registering establishment:", error);
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
  

  
  
  
