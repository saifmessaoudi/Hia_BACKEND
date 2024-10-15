import Market from '../models/market.model.js';
import Product from '../models/product.model.js'; 


export const fetchAllMarkets = async (req, res) => {
  try {
    const markets = await Market.find()
      .select("-__v")  // Exclude the __v field
      .populate({
        path: "products",  // Populate the 'products' field in Market
        populate: {
          path: "market",  // Also populate the 'market' field inside each product
          model: "Market",
          select: "-__v"  // Exclude versioning field
        },
        model: "Product",
        select: "-__v"  // Exclude versioning field in products
      });

    res.status(200).json(markets);  // Return populated markets with products and their markets
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





  export const getProductsByMarketID = async (req, res) => {
    const { id} = req.query;  // Get id, page, and batch from query parameters
   // const skip = (page - 1) * batch;

    try {
        const market = await Market.findById(id).lean();
        if (!market) {
            return res.status(404).json({ message: 'Market not found' });
        }

        const productIds = Array.isArray(market.products) ? market.products : [];
        if (productIds.length === 0) {
            return res.status(404).json({ message: 'No products found for this market' });
        }

        const products = await Product.find({ '_id': { $in: productIds } })
            .select("-__v")
            .populate("market")
            

        res.status(200).json(products);  // Send the paginated products as a response
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
        remise,
        remiseDeadline,

        
        
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
  
  