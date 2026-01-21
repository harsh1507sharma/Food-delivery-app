  import React, { useEffect } from "react";
  import { useState } from "react";
  import './list.css'
  import axios from "axios";
  import { toast } from "react-toastify"
  const List = () => {
    const [List , setList] = useState([]);

    useEffect(() => { 
        fetchlist();
      },[]);

      const removeItem = async(id)=>{ 
        try {
          const response = await axios.post("http://localhost:8000/api/v1/Food/remove" ,{id});
          if (response.status === 200) {
          toast.success("Food removed");
          await fetchlist();
      }  
        } catch (error) {
          toast.error("Error in removing the item");
          
        }
        
    
      }

    const fetchlist = async () => {
      const response = await axios.get("http://localhost:8000/api/v1/Food/list");
      // console.log(response.data);
      if(response.status === 200){
        
          setList(response.data.data);
      }
      else{
        toast.error("Error in fetching the data");
      }
    }

    return (
      <div className="list-form-flex-colmn">
        <h2>ALL FOOD ITEMS LIST</h2>
        <div className="all-list-table">
          <div className="list-row title">
            <b>IMAGES</b>
            <b>NAME</b>
            <b>PRICE</b>
            <b>CATEGORY</b>
            <b>ACTIONS</b>
          </div>
          {List.map((item, index) => (
            <div className="list-row" key={index}>
              <img src={item.image} alt={item.name} />
              <b>{item.name}</b>
              <b>${item.price}</b>
              <b>{item.category}</b>
              <button onClick={()=>removeItem(item._id)} >X</button>
            </div>
          ))}
          
        </div>
      </div>
    );
  };

  export default List;