import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    cartdata:{
        type:Object,
        of:Number,
        default:{}
        
    },
},{minimize:false});


export const User = mongoose.model("User",userSchema)


