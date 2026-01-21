import React from "react";
import './food-item.css'
import { assets } from '../../assets/assets';
import {useContext} from "react"
import UserContext from "../../context/context";

const Food_item = ({id,name,price,description,image}) => {

    const {addtoCart,removefromcart,Cartitems,setCartitems} = useContext(UserContext);
    return(
       <div className="food-item-list">
        <div className="food-item-image">
            <img classname = "food-image" src={image}/>
            {!Cartitems[id]
             ?<img onClick={()=>addtoCart(id)} className ="add" src={assets.add_icon_white}/>
             :<div className="counter">
                <img onClick={()=>removefromcart(id)} src={assets.remove_icon_red} className="remove1" />
                <p>{Cartitems[id]}</p>
                <img onClick={()=>addtoCart(id)} src={assets.add_icon_green} className="add1" />
             </div>
            }
        </div>
        <div className="food-item-info">
            <p className="name"> {name}</p>
            <img src={assets.rating_starts}  className="star-rating" />
        </div>
        <div className="food-desc-and-price">
            <p>{description}</p>
            <p className="price">${price}</p>
        </div>
       </div>
    )
}

export default Food_item;
