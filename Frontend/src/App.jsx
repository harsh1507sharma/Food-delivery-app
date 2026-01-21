import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar.jsx'
import './index.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home/home'
import Cart from './pages/Cart/cart'
import Placeorder from './pages/PlaceOrder/placeorder'
import Footer from './components/Footer/footer'
import Login from './components/Login/login'
import { ToastContainer } from 'react-toastify';


function App() {

  const [Showlogin , setShowlogin] = useState(false);

  return (
    <>
    <ToastContainer />
       {Showlogin?<Login setShowlogin={setShowlogin} />:<></>}
      <div className='app'>
      <Navbar setShowlogin={setShowlogin}/>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/cart' element = {<Cart/>} />
        <Route path='/order' element = {<Placeorder/>} />
      </Routes>
    </div>
   
    <Footer/>
    
    </>
  
    
  )
}

export default App

