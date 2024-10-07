import { Router } from "express";
import {addMarket,addProductsToMarket,fetchAllMarkets,getProductsByMarketID,addProduct,fetchAllMarketsByName} from '../controllers/market.controller.js';




const marketrouter = Router();


marketrouter.get('/getAllMarkets', fetchAllMarkets);
marketrouter.post('/fetchAllMarketsByName', fetchAllMarketsByName);
marketrouter.post('/addMarket', addMarket);
marketrouter.put('/addProductsToMarket', addProductsToMarket);
marketrouter.get('/getProductsByMarketID', getProductsByMarketID);
marketrouter.post('/addProduct' , addProduct) ;


export default marketrouter;