import React ,{useContext, useState} from "react";
import './login.css'
import { assets } from '../../assets/assets';
import UserContext from "../../context/context";
import axios from "axios";


const Login = ({setShowlogin})=>{

    const {url,settoken}  = useContext(UserContext);
    const [currstate , setcurrstate] = useState("LOGIN")
    const [data , setdata ] = useState({
        name :"",
        email :"",
        password :""
    })
    const handlechange = (e)=>{
        const name = e.target.name ;
        const value = e.target.value;
        setdata({...data , [name]:value})
    }
    const onlogin = async(e)=>{
        e.preventDefault();
        let newurl = url;
        if(currstate==="LOGIN"){
            newurl += "api/v1/User/login"
       }
       else{
        newurl += "api/v1/User/register"
       }
       try {
        const response = await axios.post(newurl,data);
        if(response.data.success){
             console.log("user logged in successfully")
            settoken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowlogin(false);
        }
        else{
            alert(response.data.message)
        }
        
       } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        
       }
        
        

    }
  
    return(
        <div className="login">
            <form onSubmit={onlogin} className="logn-page">
                <div className="login-titles">
                    <h2>{currstate}</h2>
                    <img onClick={()=>setShowlogin(false)} src={assets.cross_icon} alt="" className="" />
                </div>
                <div className="input-fields">
                    {currstate==="LOGIN"?<></>:<input type="text"  name="name" onChange={handlechange} value={data.name} placeholder="YOUR NAME" className=""  required />}
                    <input type="text" name="email" onChange={handlechange} value={data.email} placeholder="YOUR EMAIL" className=""  required />
                    <input type="text" name="password" onChange={handlechange} value={data.password} placeholder="PASSWORD" className=""  required />
                </div>
               
                <button type="submit" >{currstate==="SIGN UP"?"Create Account":"LOGIN"}</button>
                <div className="condition">
                    <input type="checkbox" required />
                    <p className="">BY AGREEING , I AGREE TO THE TERMS OF USE & PRIVACY POLICY</p>
                </div>

                {currstate==="LOGIN"?<p>CREATE A NEW ACCOUNT? <span onClick={()=>setcurrstate("SIGN UP")}>CLICK HERE</span></p>:<p>ALREADY HAVE AN ACCOUNT <span onClick={()=>setcurrstate("LOGIN")}>LOGIN HERE</span></p>}

            </form>
            </div>
    )
}

export default Login;