import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import jwt from "jsonwebtoken";
import {User} from "../models/usermodel.js";


export const verifyjwt = asynchandler (async (req, res, next)  => {
   try {
     const token = req.headers.authorization?.split(" ")[1];

     if(!token){
         return res.status(401).json({message:"Unauthorized, token missing" });
     }
     const decodedtoken = jwt.verify(token,process.env.JWT_SECRET)
 
     const user =  await User.findById(decodedtoken?.id)
     if(!user){
        return res.status(401).json({message:"Unauthorized, user not found" });
     }
     req.user = user
     next()
   } catch (error) {
       return res.status(401).json({message:"Unauthorized, invalid token" });
    
   }
})
