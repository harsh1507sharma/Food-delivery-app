import React from 'react';
import './header.css'


const Header = () => {
  return (
    <div className="header">
        <div className="header-contents">
            <h1>Order your favorite food here</h1>
            <p>Welcome to our food delivery platform where you can explore a wide variety of dishes, browse menus from trusted restaurants, and order your favorite meals with just a few clicks. Designed for a smooth and intuitive experience, this app makes food ordering quick, convenient, and enjoyable.</p>
            <button>View Menu</button>
        </div>
    </div>
  );
};

export default Header;