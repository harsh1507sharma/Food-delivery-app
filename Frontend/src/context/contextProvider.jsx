import React from "react";
import { useState, useEffect } from "react";
import UserContext from "./context";
import axios from "axios";



const UserContextProvider = ({ children }) => {

  const [food_list, setfood_list] = useState([]);
  const [Cartitems, setCartitems] = useState({});
  const url = "https://food-delivery-app-production-2e9b.up.railway.app";
  const [token, settoken] = useState(null);



  
  const fetchfoodlist = async () => {
    const response = await axios.get("https://food-delivery-app-production-2e9b.up.railway.app/api/v1/Food/list")
    setfood_list(response.data.data);
  }

  useEffect(() => {

    async function fetchData() {
      await fetchfoodlist();
      const savedToken = localStorage.getItem("token");
      
      if (savedToken) {
        settoken(savedToken);
        console.log("Loading cart data...")
        await loadcartdata(savedToken);
      }
    }
    fetchData();

  }, []);

  const addtoCart = async(itemId) => {
    if (!Cartitems[itemId]) {
      setCartitems((prev) => ({ ...prev, [itemId]: 1 }))
    }
    else {
      setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
    if(token){
      await axios.post("https://food-delivery-app-production-2e9b.up.railway.app/api/v1/Cart/add",{_id:itemId},{headers:{ Authorization: `Bearer ${token}`}})
    }
  }

  const loadcartdata = async (token) => {
  if (!token) return;

  const response = await axios.post(
    "https://food-delivery-app-production-2e9b.up.railway.app/api/v1/Cart/items",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setCartitems(response.data.cartdata || {});
};


  const removefromcart = async(itemId) => {
    setCartitems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    if(token){
      await axios.post("https://food-delivery-app-production-2e9b.up.railway.app/api/v1/Cart/remove",{_id:itemId},{headers:{ Authorization: `Bearer ${token}`}})
    }

  }

  const gettotalamount = () => {
    let total = 0;
    for (const item in Cartitems) {
      if (Cartitems[item] > 0) {
        let iteminfo = food_list.find((product) => product._id === item);
       
    if (iteminfo) {
      total += iteminfo.price * Cartitems[item];
    }
      }
    }
    return total;
  }

  const contextValue = {
    food_list,
    addtoCart,
    removefromcart,
    Cartitems,
    setCartitems,
    gettotalamount,
    url,
    token,
    settoken

  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>

  );
};

export default UserContextProvider;
