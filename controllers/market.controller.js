import Market from '../models/market.model.js';
import Product from '../models/product.model.js'; 
import Category from '../models/category.model.js'; 



export const fetchAllMarkets = async (req, res) => {
  try {
    let markets = await Market.find()
      .select("-__v")
      .populate([
        {
          path: "products",
          model: "Product",
          select: "-__v",
          populate: {
            path: "category",
            model: "Category",
            select: "name -_id"
          }
        },
        {
          path: "category",
          model: "Category",
          select: "name -_id"
        }
      ]);

    // Transform the data to replace category objects with category names
    markets = markets.map(market => {
      const transformedProducts = market.products.map(product => {
        // Replace the category object with the category name string
        return {
          ...product.toObject(),
          category: product.category ? product.category.name : null
        };
      });

      // If you also have categories at the market level, transform them similarly:
      const transformedMarketCategories = market.category.map(cat => cat.name);

      return {
        ...market.toObject(),
        products: transformedProducts,
        category: transformedMarketCategories
      };
    });

    res.status(200).json(markets);
  } catch (error) {
    console.error("Error fetching markets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




  export const addMarket = async (req, res) => {

   
    const { name, langitude, latitude, address, image} = req.body;
     try {
      const market = new Market({
        name,
        langitude,
        latitude,
        address,
        image,
        phone : "99745628",
        
       
        isOpened : true,
        foods : [],
        
      });
      await market.save();
      res.status(201).json(market);
    }
    catch (error) {
      console.error("Error adding market:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }






  export const getProductsByMarketIDAndCategory = async (req, res) => {
    const { id, category, page = 1, batch = 5 } = req.query;

    const skip = (page - 1) * batch;

    try {
        // Fetch the market
        const market = await Market.findById(id).lean();
        if (!market) {
            return res.status(404).json({ message: 'Market not found' });
        }

        // Get all product IDs in the market
        const productIds = Array.isArray(market.products) ? market.products : [];
        if (productIds.length === 0) {
            return res.status(404).json({ message: 'No products found for this market' });
        }

        // Prepare the query
        let query = { '_id': { $in: productIds } };

        if (category) {
            query.category = category; // Filter by specific category
        }

        // Fetch products and populate the category field
        const products = await Product.find(query)
            .populate('category', 'name') // Assuming `category` is a reference to the Category model
            .select("-__v -createdAt -updatedAt") // Exclude unnecessary fields
            .skip(parseInt(skip))
            .limit(parseInt(batch))
            .lean(); // Return plain JavaScript objects

        if (products.length === 0) {
            return res.status(404).json({ message: `No products found for category '${category}' in this market` });
        }

        if (!category) {
            // Group products by category name
            const groupedProducts = products.reduce((acc, product) => {
                const categoryName = product.category?.name || 'Uncategorized';
                if (!acc[categoryName]) {
                    acc[categoryName] = [];
                }
                acc[categoryName].push(product);
                return acc;
            }, {});

            return res.status(200).json(groupedProducts);
        }

        // If category is specified, return the products directly
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};








 


  
  export const addProductsToMarket = async (req, res) => {
    const {marketId, productId} = req.body;
  
    console.log('Request body:', req.body);
  
    if (!marketId || !productId) {
      return res.status(400).json({ message: 'Market ID and Food ID are required' });
    }
  
    try {
      const market = await Market.findById(marketId);
      if (!market) {
        return res.status(404).json({ message: 'Market not found' });
      }
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'product not found' });
      }
  
      product.market = marketId;
      await product.save();
  
      market.products.push(productId);
      await market.save();
  
      res.status(200).json({ product, market });
    } catch (error) {
      console.error('Error adding food to market:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };

  export const addProduct = async (req, res) => {

   
    const {name,price,isAvailable,image,category,remise,remiseDeadline} = req.body;
     try {
      const product = new Product({
        name,
        description : "il est totalement necessaire" , 
        price,
        isAvailable,
        image,
        category,
       

        
        
      });
      await product.save();
      res.status(201).json(product);
    }
    catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  export const fetchAllMarketsByName = async (req, res) => {
    try {
      // Extract the search term from the request body
      const { name } = req.body;
  
      // Find markets with names that partially match the input, excluding the exact name from the request
      const markets = await Market.find({
        name: { $regex: name, $options: "i" },  // 'i' makes it case-insensitive
        // Exclude the market with the exact name from the results
        name: { $ne: name },
      })
        .select("-__v")  // Exclude the __v field
        .populate({
          path: "products",  // Populate the 'products' field in Market
          populate: {
            path: "market",  // Also populate the 'market' field inside each product
            model: "Market",
            select: "-__v",  // Exclude versioning field
          },
          model: "Product",
          select: "-__v",  // Exclude versioning field in products
        });
  
      // Return the filtered markets
      res.status(200).json(markets);
    } catch (error) {
      console.error("Error fetching markets:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
 
  export const assignCategoryToProduct = async (req, res) => {
    
    try {
      const { productId, categoryId } = req.body;
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Produit non trouvé" });
      }
  
      const market = await Market.findById(product.market);
      if (!market) {
        return res.status(404).json({ error: "Marché non trouvé pour ce produit" });
      }
  
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: "Catégorie non trouvée" });
      }
  
      if (!market.category.includes(categoryId)) {
        market.category.push(categoryId);
        await market.save();
      }
  
      
      product.category = [categoryId]; 
      await product.save();
  
      res.status(200).json({
        message: "Catégorie assignée avec succès au produit et mise à jour dans le marché",
        product,
      });
    } catch (error) {
      console.error("Erreur lors de l'affectation de la catégorie :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };
  
  
  export const  getMarketCategories = async (req, res) => {
    try {
      const { marketId } = req.query;
  
      // Fetch market by ID and populate categories
      const market = await Market.findById(marketId).populate("category", "-__v");
  
      if (!market) {
        return res.status(404).json({ error: "Marché non trouvé" });
      }
  
      res.status(200).json({
       
        categories: market.category,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories du marché :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };
  export const addCategoryToMarket = async (req, res) => {
    try {
      const { marketId } = req.params;
      const { categoryId } = req.body;
  
      // Fetch market by ID
      const market = await Market.findById(marketId);
      if (!market) {
        return res.status(404).json({ error: "Marché non trouvé" });
      }
  
      // Check if the category is already assigned
      if (market.category.includes(categoryId)) {
        return res.status(400).json({ message: "La catégorie est déjà assignée à ce marché" });
      }
  
      // Push category to the market
      market.category.push(categoryId);
      await market.save();
  
      res.status(200).json({
        message: "Catégorie ajoutée avec succès au marché",
        market,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie au marché :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };
  export const removeCategoryFromMarket = async (req, res) => {
    try {
      const { marketId } = req.params;
      const { categoryId } = req.body;
  
      // Fetch market by ID
      const market = await Market.findById(marketId);
      if (!market) {
        return res.status(404).json({ error: "Marché non trouvé" });
      }
  
      // Check if the category exists in the market
      const categoryIndex = market.category.indexOf(categoryId);
      if (categoryIndex === -1) {
        return res.status(400).json({ message: "La catégorie n'est pas assignée à ce marché" });
      }
  
      // Remove the category from the market
      market.category.splice(categoryIndex, 1);
      await market.save();
  
      res.status(200).json({
        message: "Catégorie retirée avec succès du marché",
        market,
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie du marché :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  };
 