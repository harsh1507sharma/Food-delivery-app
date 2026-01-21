import React from "react";
import "./download.css"
import { assets } from '../../assets/assets';

const Download = ()=>{
    return(
        <div className="download" id="download">
            <h1 className="">
                DOWNLOAD THE APP FOR BETTER EXPERIENCE 
            </h1>
            <div className="logo">
                 <img src={assets.play_store} alt="" className="" />
                 <img src={assets.app_store} alt="" className="" />
            </div>
           
        </div>
    )
}

export default Download;