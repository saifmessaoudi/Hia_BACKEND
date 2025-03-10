import { Router } from "express";
import {getAllEtablissements,getEstablishmentDetail,getProductsByEstablishmentID,addFoodsToEstablishment,addEstablishment, updateEstablishment} from '../controllers/establishementController.js';
import {registerEstablishment , loginEstablishment , doesEmailExist, doesAccountVerified} from '../controllers/authController.js';




const establishementrouter = Router();


establishementrouter.get('/getAll', getAllEtablissements);
establishementrouter.get('/getDetail/:id', getEstablishmentDetail);
establishementrouter.post('/add', addEstablishment);
 
establishementrouter.post('/getProductsByEstablishmentID', getProductsByEstablishmentID);
establishementrouter.post('/addFoodsToEstablishment', addFoodsToEstablishment);
establishementrouter.post('/register', registerEstablishment);
establishementrouter.post('/login', loginEstablishment);
establishementrouter.get('/doesEmailExist/:email', doesEmailExist);
establishementrouter.get('/doesAccountVerified/:email', doesAccountVerified);
establishementrouter.put('/update/:id', updateEstablishment);

export default establishementrouter;