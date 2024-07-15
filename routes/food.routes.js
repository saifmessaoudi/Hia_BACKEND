import { Router } from "express";
import { addTestFood,getAllFoods } from "../controllers/food.controller.js";

const foodRouter = Router();

foodRouter.post("/addTestFood", addTestFood);
foodRouter.get("/getAllFoods", getAllFoods);


export default foodRouter;