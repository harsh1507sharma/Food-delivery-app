import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
dotenv.config({ path: './.env' });

const app = express()

app.use(cors({
    origin: ["https://food-delivery-app-mu-two.vercel.app", "https://food-delivery-app-gd4l.vercel.app"],
    credentials: true,
}))


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


// routes import 
import { Foodrouter} from "./src/routes/foodrouter.js"
import { Userrouter } from "./src/routes/userroutes.js"
import { CartRouter } from "./src/routes/cartroutes.js"
import {Orderrouter}  from "./src/routes/orderroutes.js"

// routes declaration

app.use("/api/v1/Food",Foodrouter)
app.use("/api/v1/User",Userrouter)
app.use("/api/v1/Cart",CartRouter)
app.use("/api/v1/Order",Orderrouter)

// http://localhost:8000/api/v1/Food
export {app};