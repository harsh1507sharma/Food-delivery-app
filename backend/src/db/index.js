import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    console.log("ENV CHECK:", {
  PORT: process.env.PORT,
  MONGO: process.env.MONGODB_URI
});

    try {
       const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
       console.log(`\n MongoDB connected !! DB HOST : ${connectioninstance.connection.host}`);
        
    } catch (error) {
        console.log("mongoose connection error ",error)
        process.exit(1)
    }
} 


export default connectDB