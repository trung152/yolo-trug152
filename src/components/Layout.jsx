import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Cart from '../pages/Cart'
import Catalog from '../pages/Catalog'
import Home from '../pages/Home'
import Product from '../pages/Product'
const Layout = () => {
  return (
    <div>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/catalog' element={<Catalog/>} />
          <Route path='/product' element={<Product/>} />
        </Routes>
      <Footer/>
    </div>
  )
}

export default Layout