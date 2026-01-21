import express from 'express';
import { registerUser,loginUser } from '../controllers/usercontroller.js';


const Userrouter = express.Router();

Userrouter.route('/register').post(registerUser);
Userrouter.route('/login').post(loginUser);

export { Userrouter };