import React from 'react'
import './App.css'
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add/add'
import List from './pages/List/list'
import Order from './pages/Order/order'
import { ToastContainer} from 'react-toastify';



function App() {

  return (
    <>
    <ToastContainer/>
    <Navbar />
    <hr/>
    <div className="admin-content">
      <Sidebar />
 
    <Routes>
     <Route path="/add" element={<Add/>} />
     <Route path="/list" element={<List/>} />
     <Route path="/order" element={<Order/>} />
    </Routes>
      </div>
     
    </>
  )
}

export default App
