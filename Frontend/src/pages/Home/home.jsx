import React from 'react';
import {useState} from 'react'
import './home.css'
import Header from '../../components/Header/header';
import Explore from '../../components/ExploreMenu/explore';
import Food_Display from '../../components/foodDisplay/display';
import Download from '../../components/appDownload/download';

const Home = () => {
  const [category,setCategory]= useState("ALL");
  return (
    <div>
      <Header/>
      <Explore category = {category} setCategory = {setCategory} />
      <Food_Display category={category} />
      <Download/>

    </div>
  );
};

export default Home;
