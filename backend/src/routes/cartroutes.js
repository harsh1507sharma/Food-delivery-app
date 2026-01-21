import express from 'express';
import {addtocart , getcartitems, removefromcart} from '../controllers/cartcontroller.js';
import {verifyjwt} from '../middlewares/authmiddleware.js';

const CartRouter = express.Router();

CartRouter.route('/add').post(verifyjwt, addtocart);
CartRouter.route('/items').post(verifyjwt, getcartitems);
CartRouter.route('/remove').post(verifyjwt, removefromcart);

export {CartRouter};