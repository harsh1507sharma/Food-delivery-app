import express from "express"
import {placeOrder} from '../controllers/ordercontroller.js';
import {verifyjwt} from '../middlewares/authmiddleware.js';

const Orderrouter = express.Router();

Orderrouter.route("/place").post(verifyjwt,placeOrder);

export  {Orderrouter};