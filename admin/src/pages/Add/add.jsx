import React from "react";
import { useState, useEffect, useRef } from "react";
import "./add.css";
import { assets } from '../../assets/assets';
import { Form } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
    const [Image, setImage] = useState(null);
   

    const [data, setData] = useState({
        name: "",
        description: "",
        category: "Salad",
        price: ""
    });




    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const form = new FormData();
        form.append("name", data.name);
        form.append("description", data.description);
        form.append("category", data.category);
        form.append("price", data.price);
        form.append("image", Image);

        // You can use fetch or axios to send 'form' to your backend
        try {
            const response = await axios.post("https://food-delivery-app-production-2e9b.up.railway.app/api/v1/Food/addFood", form)

            if (response.status === 200) {

                
                setData({
                    name: "",
                    description: "",
                    category: "Salad",
                    price: "",
                });

                toast.success("Food Added Successfully");

                 setImage(null);

                

                console.log("Success:", response.data);

            }


        } catch (error) {
            console.log("Error submitting form:", error);

        }



    };


    // for checking data state
    useEffect(() => {
        console.log(data);
    }, [data]);



    const onchangehandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    };


    return (
        <>
            <div className="add">
                <form className="flex-col" onSubmit={onSubmitHandler} >
                    <div className="upload-image-flex-colmn">
                        <p>Upload Image</p>
                        <label htmlFor="image" >
                            <img src={Image ? URL.createObjectURL(Image) : assets.upload_area} alt="" />
                        </label>
                        <input  onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </div>

                    <div className="product-flex-colm">
                        <p>Product Name</p>
                        <input type="text" placeholder="Type here" onChange={onchangehandler} name="name" value={data.name} />
                    </div>
                    <div className="product-desciption">
                        <p>Product Description</p>
                        <textarea name="description" rows={6} id="" placeholder="Write here!!" onChange={onchangehandler} value={data.description}></textarea>
                    </div>

                    <div className="product-category-price">
                        <div className="category">
                            <p>Product Category</p>
                            <select name="category" onChange={onchangehandler} value={data.category} >
                                <option value="Salad">Salad</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Desert">Desert</option>
                                <option value="Sandwich">Sandwich</option>
                                <option value="Cake">Cake</option>
                                <option value="Pasta">Pasta</option>
                                <option value="Pure Veg">Pure Veg</option>
                                <option value="Noodles">Noodles</option>
                            </select>
                        </div>
                        <div className="price">
                            <p>Product Price</p>
                            <input type="NUMBER" placeholder="$25" onChange={onchangehandler} name="price" value={data.price} />
                        </div>
                    </div>
                    <button type="submit" className="add-btn">ADD</button>
                </form>
            </div>


        </>
    );
};

export default Add;