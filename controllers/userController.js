import User from '../models/user.model.js';
import { validationResult } from 'express-validator';

export const updateUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  
  const { id , firstName, lastName, email, password,phone} = req.body;

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
    if (phone) user.phone = phone;

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