import { Router } from "express";
import {getAllEtablissements,getEstablishmentDetail,addEstablishment} from '../controllers/establishementController.js';




const establishementrouter = Router();


establishementrouter.get('/getAll', getAllEtablissements);
establishementrouter.get('/getDetail', getEstablishmentDetail);
establishementrouter.post('/add', addEstablishment);
 

export default establishementrouter;