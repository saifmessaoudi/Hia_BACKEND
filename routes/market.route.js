import { Router } from "express";
import {addMarket,addProductsToMarket,fetchAllMarkets,getProductsByMarketID,addProduct,fetchAllMarketsByName,assignCategoryToProduct,addCategoryToMarket,getMarketCategories,removeCategoryFromMarket} from '../controllers/market.controller.js';




const marketrouter = Router();


marketrouter.get('/getAllMarkets', fetchAllMarkets);
marketrouter.post('/fetchAllMarketsByName', fetchAllMarketsByName);
marketrouter.post('/addMarket', addMarket);
marketrouter.put('/addProductsToMarket', addProductsToMarket);
marketrouter.get('/getProductsByMarketID', getProductsByMarketID);
marketrouter.post('/addProduct' , addProduct) ;
marketrouter.post('/assignCategoryToProduct' , assignCategoryToProduct) ;
marketrouter.get('/getMarketCategories' , getMarketCategories) ;
marketrouter.post("/:marketId/addCategoryToMarket", addCategoryToMarket);
marketrouter.post('/:marketId/removeCategoryFromMarket' , removeCategoryFromMarket) ;







export default marketrouter;