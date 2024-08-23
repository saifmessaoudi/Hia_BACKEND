import { Router } from "express";
import { addTestFood,getAllFoods , addReview , getReviewByFoodID , getFoodByID,addFood} from "../controllers/food.controller.js";

const foodRouter = Router();

foodRouter.post("/addTestFood", addTestFood);
foodRouter.get("/getAllFoods", getAllFoods);
foodRouter.post("/addReview/:foodID", addReview);
foodRouter.get("/getReviewByFoodID/:foodID", getReviewByFoodID);
foodRouter.post("/getFoodById", getFoodByID);   
foodRouter.post("/addFood", addFood);


export default foodRouter;