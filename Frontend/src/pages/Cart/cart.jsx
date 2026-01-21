import React, { useContext,} from 'react';
import UserContext from '../../context/context';
import {useNavigate} from "react-router-dom"

import './cart.css'
const Cart = () => {
  const { Cartitems, removefromcart, food_list,gettotalamount } = useContext(UserContext);

  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>ITEMS</p>
          <p>TITLE</p>
          <p>PRICE</p>
          <p>QUANTITY</p>
          <p>TOTAL</p>
          <p>REMOVE</p>
        </div>

        <br />

        <hr />
        {food_list.map((item, index) => {
          if (Cartitems[item._id] > 0) {
            return (

              <div className="cart-details-container">
                <div className="cart-items-details">
                  <img src={item.image} alt="" className="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{Cartitems[item._id]}</p>
                  <p>${item.price * Cartitems[item._id]}</p>
                  <p onClick={() => removefromcart(item._id)} className='remove'>X</p>
                </div>
                <hr />

              </div>

            )
          }
        })}

      </div>
      <div className="cart-bottom">
        <div className="bill-cart">
          <h2 className="">CART TOTALS</h2>
          <div>
            <div className="subtotal-total">
              <p>SUBTOTAL</p>
              <p>${gettotalamount()}</p>

            </div>
            <hr />

            <div className="subtotal-total">
              <p>DELIVERY FEE</p>
              <p>${gettotalamount()===0?"0":"2"}</p>

            </div>
            <hr />

            <div className="subtotal-total">
              <b>TOTAL</b>
              <b>${gettotalamount()===0?"0":gettotalamount() +2}</b>
            </div>

          </div>
          <button onClick={()=>navigate("/order")} >PROCEED TO CHECKOUT</button>


        </div>

        <div className="promo-code">
          <p>If you have a promo code , Enter it here!</p>
          <div className="code">
            <input type="text" placeholder='PROMO CODE' />
             <button>SUBMIT</button>
          </div>
         
        </div>


      </div>
    </div>

  );
}


export default Cart;