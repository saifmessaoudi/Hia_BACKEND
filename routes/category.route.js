import { Router } from "express";
import {addCategory,fetchCategories,RemoveCategory} from '../controllers/category.controller.js';




const categoryRouter = Router();


categoryRouter.post('/addCategory', addCategory);
categoryRouter.get('/fetchCategories', fetchCategories);
categoryRouter.post('/RemoveCategory', RemoveCategory);


export default categoryRouter ;