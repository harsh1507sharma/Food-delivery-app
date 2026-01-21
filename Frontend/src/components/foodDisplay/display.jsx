import React from "react";
import './display.css'
import {useContext} from "react"
import UserContext from "../../context/context";
import Food_item from "../food_item/food-item";

const Food_Display = ({category})=>{
    const {food_list} = useContext(UserContext)
    return(
         <div className="food-display">
            <h2>
                Top Dishes Near you
            </h2>
            <div className="food-display-list">
                {food_list.map((item,index)=>{
                     if ( category==="ALL" || category ===item.category){
                         return (
                       
                        < Food_item key ={index} id={item._id} name ={item.name} price={item.price} description= {item.description} image={item.image}/>
                )
                     }
                })}
            </div>

            

        </div>

    )
}

export default Food_Display;