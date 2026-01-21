import express from "express"
import { addFood , Listfood, removefood } from "../controllers/foodcontroller.js";
import { upload } from "../middlewares/multer-middleware.js";

const Foodrouter = express.Router();

Foodrouter.route("/addFood").post(upload.single("image"),addFood)
Foodrouter.route("/list").get(Listfood)
Foodrouter.route("/remove").post(removefood)

export {Foodrouter}