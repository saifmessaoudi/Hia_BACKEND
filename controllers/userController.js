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