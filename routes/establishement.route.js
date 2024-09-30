import { Router } from "express";
import {getAllEtablissements,getEstablishmentDetail,getProductsByEstablishmentID,addFoodsToEstablishment,addEstablishment} from '../controllers/establishementController.js';
import {registerEstablishment , loginEstablishment} from '../controllers/authController.js';




const establishementrouter = Router();


establishementrouter.get('/getAll', getAllEtablissements);
establishementrouter.get('/getDetail', getEstablishmentDetail);
establishementrouter.post('/add', addEstablishment);
 
establishementrouter.post('/getProductsByEstablishmentID', getProductsByEstablishmentID);
establishementrouter.post('/addFoodsToEstablishment', addFoodsToEstablishment);
establishementrouter.post('/register', registerEstablishment);
establishementrouter.post('/login', loginEstablishment);

export default establishementrouter;