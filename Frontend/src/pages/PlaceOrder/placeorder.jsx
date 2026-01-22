import React ,{useContext} from 'react';
import './placeorder.css'
import UserContext from '../../context/context';
import { useState } from 'react';
import axios from "axios";


const Placeorder = () => {
  const {gettotalamount,food_list ,Cartitems,token} = useContext(UserContext);

  const [data,setdata] = useState({
    firstname :"",
    lastname :"",
    email:"",
    street:"",
    city :"",
    state :"",
    zipcode:"",
    country :"",
    phone : "",
  })
    
  
  const onchangehandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setdata( data=>({...data,[name]:value}) )
  }
  const placeorder = async(e)=>{
    e.preventDefault();
    let orderitems = [];
    food_list.map((item)=>{
      if(Cartitems[item._id]>0){
        orderitems.push({
        name: item.name,
        price: item.price,
         quantity: Cartitems[item._id],
        })
      }
    })
    console.log(orderitems);
    let orderdata = {
      address : data,
      items : orderitems,
      amount : gettotalamount() +2,
    }
    let response = await axios.post("https://food-delivery-app-production-2e9b.up.railway.app/api/v1/Order/place",orderdata,{
    headers: {
      Authorization: `Bearer ${token}`,
    },})
  
    if(response.data.success){
      const {url} = response.data;
      window.location.replace(url);
    }
    else{
      alert("Error");
    }
  } 
  


  return (
    <form onSubmit={placeorder} action="" className="place-order">

      <div className="placeorder-left">
        <h2 >DELIVERY INFORMATION</h2>
        <div className="multi-fields">
          <input required name="firstname" onChange={onchangehandler} value={data.firstname} type="text" placeholder='FIRST NAME'/>
          <input required  name="lastname" onChange={onchangehandler} value={data.lastname} type="text" placeholder='LAST NAME'/>
        </div>
         <input required  name="email" onChange={onchangehandler} value={data.email} type="text" placeholder='EMAIL ADDRESS'/>
          <input required  name="street" onChange={onchangehandler} value={data.street} type="text" placeholder='STREET'/>
        <div className="multi-fields">
          <input required  name="city" onChange={onchangehandler} value={data.city} type="text" placeholder='CITY'/>
          <input required  name="state" onChange={onchangehandler} value={data.state} type="text" placeholder='STATE'/>
        </div>
         <div className="multi-fields">
          <input required  name="zipcode" onChange={onchangehandler} value={data.zipcode} type="text" placeholder='ZIPCODE'/>
          <input required  name="country" onChange={onchangehandler} value={data.country} type="text" placeholder='COUNTRY'/>
        </div>
        <input required  name="phone" onChange={onchangehandler} value={data.phone} type="text" placeholder='PHONE'/>
      </div>




      <div className="placeorder-right">
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
              <p>${gettotalamount()===0?"0":"5"}</p>

            </div>
            <hr />

            <div className="subtotal-total">
              <b>TOTAL</b>
              <b>${gettotalamount()===0?"0":gettotalamount() +5}</b>
            </div>

          </div>
          <button type='submit' >PROCEED TO CHECKOUT</button>


        </div>
         
      </div>
    </form>

  );
};

export default Placeorder;