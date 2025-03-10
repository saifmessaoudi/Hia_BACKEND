import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import Market from "../models/market.model.js";




export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(403).json({ error: "Catégorie déjà existante" });
        }

        const category = new Category({
            name,
        });

        const savedCategory = await category.save();

        res.status(201).json(savedCategory);
    } catch (error) {
        console.error("Error adding category:", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};
export const fetchCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        if (categories.length === 0) {
            return res.status(404).json({ message: "Aucune catégorie trouvée" });
        }

         res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};    
export const RemoveCategory = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // Validate if the category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: "Catégorie non trouvée" });
        }

        // Delete the category
        await Category.findByIdAndDelete(categoryId);

        // Remove the category from products
        await Product.updateMany(
            { category: categoryId }, // Match products with the category
            { $unset: { category: "" } } // Remove the category field
        );

        // Remove the category from market categories array
        await Market.updateMany(
            { category: categoryId }, // Match markets with the category
            { $pull: { category: categoryId } } // Pull the category ID from the array
        );

        res.status(200).json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};




