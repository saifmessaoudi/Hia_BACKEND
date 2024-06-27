import Etablishment from '../models/etablishment.model.js';



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