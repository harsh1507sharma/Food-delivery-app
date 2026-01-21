import { User } from "../models/usermodel.js";
import { asynchandler } from "../utils/asynchandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { ApiError } from "../utils/apierror.js";

// create jwt token
const createtoken = async(userId)=>{
    return jwt.sign({id:userId},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
        )
}
// register user
const registerUser = asynchandler(async(req,res)=>{
     // get user details from frontend
    // validation - not null , undefined
    // check if user already exists : usrname , email
    // upload them to cloudinary, check avatar
    // create  user object - create entry in db
    // remove the password and refresh token field from response
    // check if user created successfully
    // return response to frontend

    const {name , email , password} = req.body;

     if (name === "") {
            return res.status(400).json({ error: "Name is required" })
    }
    if (email === "") {
        return res.status(400).json({ error: "Email is required" })
    }
    if (password === "") {
       return res.status(400).json({ error: "Password is required" })
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({ error: "Invalid email format" })
    }
    if(password.length < 6){
        return res.status(400).json({ error: "Password must be at least 6 characters long" })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const existinguser = await User.findOne( { email: email.toLowerCase()});
    if (existinguser) {
        return res.status(400).json({ error: "User already exists" })
    }
     
 
    const user = await User.create({
        name :name,
        email:email,
        password :hashedPassword
    })

    const token = await createtoken(user._id);
   return res.status(201).json({
        success: true,
        message: "User registered successfully",
       
})

})
// login usercontroller
const loginUser = asynchandler(async(req,res)=>{
  
    
    const { email , password } = req.body

    try {
        const user = await User.findOne({email})
        if (!user) {
        return res.status(404).json({ error: "User not found" })
        }

        const passmatch = await bcrypt.compare(password, user.password)
        if (!passmatch) {
        return res.status(401).json({ error: "Invalid credentials" })
        }

        const token = await createtoken(user._id);
        return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
    })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" })
        
    }



})


export {registerUser,loginUser}