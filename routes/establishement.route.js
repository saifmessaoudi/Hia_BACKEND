import { Router } from "express";
import {getAllEtablissements,getEstablishmentDetail,getProductsByEstablishmentID,addFoodsToEstablishment,addEstablishment} from '../controllers/establishementController.js';




const establishementrouter = Router();


establishementrouter.get('/getAll', getAllEtablissements);
establishementrouter.get('/getDetail', getEstablishmentDetail);
establishementrouter.post('/add', addEstablishment);
 
establishementrouter.post('/getProductsByEstablishmentID', getProductsByEstablishmentID);
establishementrouter.post('/addFoodsToEstablishment', addFoodsToEstablishment);

export default establishementrouter;