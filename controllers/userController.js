import Food from '../models/food.model.js';
import User from '../models/user.model.js';
import { validationResult } from 'express-validator';

export const updateUserProfile = async (req, res) => {
  const { id , firstName, lastName, email, password} = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.body.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Conditional updates
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = password;
   

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const updatelocation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    
    const { id , address, langitude, latitude} = req.body;
  
    try {
      const user = await User.findById(req.body.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Conditional updates
      if (address) user.address = address;
      if (langitude) user.langitude = langitude;
      if (latitude) user.latitude = latitude;
      
  
      await user.save();
  
      res.status(200).json({ message: 'location updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  export const verifEmail = async (req, res) => {
    const { email } = req.query;
  
    try {
      const user = await User.findOne({ email: email });
  
      if (user) {
        return res.status(200).json({ success: true, message: 'Email is already registered' });
      } else {
        return res.status(404).json({ success: false, message: 'Email is not registered' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }




    
};
export const getUserById = async (req, res) => {
  const { id } = req.body; // Retrieve ID from request body

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const chooseFoodPreference = async (req, res) => {
const { foodPreference , userId} = req.body;
try {
  const user = await User.findById (userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
user.foodPreference = foodPreference;
   
    await user.save();
    res.status(200).json({ message: 'Food preference updated successfully', user });
}
catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
};

export const addFoodsToFavourites = async (req, res) => {
  const { Idfood, userId } = req.body;

  try {
    const user = await User.findById(userId);
    const food = await Food.findById(Idfood);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const foodExists = user.favoriteFood.some(favFood => favFood.equals(Idfood));

    if (foodExists) {
      return res.status(400).json({ message: 'Food is already in favorites' });
    }

    user.favoriteFood.push(Idfood);
    await user.save();

    res.status(200).json({ message: 'Food added to favorites', favoriteFood: user.favoriteFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const removeFoodsFromFavourites = async (req, res) => {
  const { Idfood, userId } = req.body;

  try {
    const user = await User.findById(userId);
    const food = await Food.findById(Idfood);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const foodExists = user.favoriteFood.some(favFood => favFood.equals(Idfood));

    if (!foodExists) {
      return res.status(400).json({ message: 'Food is not already in favorites' });
    }

    user.favoriteFood.pull(Idfood);
    await user.save();

    res.status(200).json({ message: 'Food removed from favorites', favoriteFood: user.favoriteFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getFavouriteProductsByUserID = async (req, res) => {
  const { iduser } = req.body;  // Ideally, this should be a query parameter or path parameter in a GET request

  try {
    const user = await User.findById(iduser);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const foodIds = user.favoriteFood;

    if (foodIds && foodIds.length > 0) {
      const foods = await Food.find({ '_id': { $in: foodIds } });
      return res.status(200).json(foods);
    } else {
      return res.status(203).json({ message: 'Favorite food list is empty' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const verifFoodFavourite = async (req, res) => {
  const { iduser, idfood } = req.body;  // Ideally, this should be a query parameter or path parameter in a GET request

  try {
    const user = await User.findById(iduser);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const foodIds = user.favoriteFood;

    if (foodIds.length === 0) {
      return res.status(404).json({ message: 'Favorite food list is empty' });
    } 

    const foodExists = user.favoriteFood.some(favFood => favFood.equals(idfood));
    if (!foodExists) {
      return res.status(200).json({ message: 'Food does not exist in favorites' });
    } else {
      return res.status(201).json({ message: 'Food already exists in favorites' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};







