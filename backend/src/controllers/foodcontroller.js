import { Food } from "../models/Foodmodel.js";
import { asynchandler } from "../utils/asynchandler.js";
import {v2 as cloudinary} from "cloudinary";
import fs from "fs/promises";
import {test} from "../../public/temp/test.js"
import { uploadToCloudinary } from "../utils/cloudinary.js";
import path from "path";


// add food item
const addFood = asynchandler(async(req,res)=>{
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image nahi aayi (Postman issue)"
    });
  }
  const cloudinaryResult = await uploadToCloudinary(req.file.path);


  if (!cloudinaryResult) {
    return res.json({ success: false, message: "Cloudinary upload failed" });
  }

  const {name,description,price,category} = req.body

   
    const details = await Food.create({
      name ,
      description,
      price,
      category,
      image : cloudinaryResult.secure_url,
      imagePublicId: cloudinaryResult.public_id,
    })

    try {
        res.json({success:true , message:"Food added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }

    
})
//list food

const Listfood = asynchandler(async(req,res)=>{

    try {
        const foods = await Food.find();
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error in listing"})
        
    }

})

// remove food-item

const removefood = asynchandler(async(req,res)=>{
   


    try {
        console.log("BODY ", req.body); //  DEBUG

       const id = req.body?.id; // safe access

       
        const food = await Food.findById(req.body.id);
        
            //  Delete image from Cloudinary
         if (food.imagePublicId) {
        await cloudinary.uploader.destroy(food.imagePublicId);
       }

        
        // delete from DB
        await Food.findByIdAndDelete(req.body.id);
        res.json({success:true , message:"food item removed"})

    } catch (error) {
        console.log(error);
        res.json({success:false , message:"food item not removed"})
        
    }

})

export {addFood,Listfood,removefood}


// get info from req
// get info from db

// process data 

// send res