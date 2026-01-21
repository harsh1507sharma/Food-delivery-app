import React from "react";
import { assets } from '../../assets/assets';
import './footer.css'

const Footer = ()=>{
    return(
        <div className="footer">
        <div className="footer-content">
            <div className="left-footer">
                  <img src={assets.logo} className="" />
                  <p className="text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea doloremque neque modi dicta. Aspernatur soluta, veniam sapiente rem sint aut illum atque sed quibusdam doloribus, provident distinctio eveniet voluptates consequatur.</p>
                  <div className="footer-logos">
                    <img src={assets.facebook_icon}  className="" />
                    <img src={assets.twitter_icon} className="" />
                    <img src={assets.linkedin_icon} className="" />
                  </div>
            </div>

            <div className="center-footer">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>

            </div>

            <div className="right-footer">
                <h2>GET IN TOUCH</h2>
                <p className="contact" id="contact"> +91-9259576701</p>
                <p className="email">harsh.20242028@mnnit.ac.in</p>
            </div>
            
        </div>
        <hr/>
            <p className="footer-copyright" >Copyright Tomato.com -ALL RIGHTS RESERVED    </p>

        </div>
    )
}

export default Footer;