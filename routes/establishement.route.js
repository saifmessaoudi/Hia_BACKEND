import { Router } from "express";
import {getAllEtablissements,getEstablishmentDetail} from '../controllers/establishementController.js';




const establishementrouter = Router();

establishementrouter.get('/getAll', getAllEtablissements);
establishementrouter.get('/getDetail', getEstablishmentDetail);

export default establishementrouter;