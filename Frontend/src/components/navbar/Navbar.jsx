import React, { useContext, useState } from 'react';
import './Navbar.css' 
import { assets } from '../../assets/assets';
import {Link, useNavigate} from "react-router-dom"
import UserContext from '../../context/context';


const Navbar = ({setShowlogin}) => {

  const [menu,setmenu] = useState("home");
  
  const {gettotalamount,token,settoken} = useContext(UserContext);
  const navigate = useNavigate();

  const logout = ()=>{
    console.log("LOGOUT CLICKED");
    localStorage.removeItem("token");
    settoken(null);
    navigate('/');
    
  
  };

  return (
    <div className='navbar'>
     <Link to='/'> <img src={assets.logo} alt="" className="logo" /></Link>
     <ul className="navbar-menu">
      <Link to='/' onClick={()=>setmenu("home")} className={menu=="home"?"active":""}>Home</Link>
      <a href="#explore-menu" onClick={()=>setmenu("Menu")} className={menu=="Menu"?"active":""}>Menu</a>
      <a href="#download" onClick={()=>setmenu("Mobile-App")} className={menu=="Mobile-App"?"active":""}>Mobile-App</a>
      <a href="#contact" onClick={()=>setmenu("Contact-Us")} className={menu=="Contact-Us"?"active":""}>Contact-Us</a>
     </ul>
     <div className="navbar-right">
      <img src={assets.search_icon} alt="" />
      <div className="basket">
       <Link to='/cart' ><img src={assets.basket_icon} alt="" /></Link> 
       <div className= {gettotalamount()===0?" ":"dot"}></div>
      </div>
      <div className="sign-in">
        {!token?<button onClick={()=>setShowlogin(true)} >Sign-In</button>: 
        <div className="navbar-proflie">
          <img src={assets.profile_icon} />
          <ul className='navbar-dropdown'>
          <li><img src={assets.bag_icon} /><p>ORDERS</p></li>
          <hr/>
          <li onClick={()=>{logout()}}><img  src={assets.logout_icon} />
          <p>LOGOUT</p>
          </li>
          </ul>
        </div>
        }
      </div> 
     </div>
    </div>
  );
};
export default Navbar;
  