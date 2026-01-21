import { asynchandler } from "../utils/asynchandler.js";
import {User} from "../models/usermodel.js";

// addtocart
const addtocart = asynchandler(async (req, res) => {

    try {
         let userdata = await User.findById(req.user._id);
         let cartdata = await userdata.cartdata;
         
         if(!cartdata[req.body._id]){
            cartdata[req.body._id] = 1;
         }
         else{
            cartdata[req.body._id] += 1;
         }

         await User.findByIdAndUpdate(req.user._id, {cartdata:cartdata}, {new:true});
         return res.status(200).json({message:"Item added to cart successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
        
    }
});

// removefromcart       
const removefromcart = asynchandler(async (req, res) => {

    try {
        let userdata = await User.findById(req.user._id);
        let cartdata = await userdata.cartdata;
        if(cartdata[req.body._id]>0){
            cartdata[req.body._id] -= 1;
        }
        await User.findByIdAndUpdate(req.user._id, {cartdata:cartdata});
        return res.status(200).json({message:"Item removed from cart successfully"});
    } catch (error) {

        console.log(error);
        return res.status(500).json({message:"Internal server error"});
        
    }
   
});

// getcartitems
const getcartitems = asynchandler(async (req, res) => {
    try {
        let userdata = await User.findById(req.user._id);
        let cartdata = await userdata.cartdata;
        return res.status(200).json({success:true,cartdata});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});

    }
   
});

export { addtocart , removefromcart , getcartitems };