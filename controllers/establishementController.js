import Etablishment from '../models/etablishment.model.js';
import Food from '../models/food.model.js'; 



export const getAllEtablissements = async (req, res) => {
    try {
      const etablissements = await Etablishment.find();
      res.status(200).json(etablissements);
    } catch (error) {
      console.error("Error fetching etablissements:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export const getEstablishmentDetail = async (req, res) => {
    const { id } = req.body; 
  
    try {
      const Etablishment = await Etablishment.findById(id);
      if (!Etablishment) {
        return res.status(404).json({ message: 'Etablishment not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
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
  
  
  