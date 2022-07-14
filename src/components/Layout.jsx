import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Cart from '../pages/Cart'
import Catalog from '../pages/Catalog'
import Home from '../pages/Home'
import Product from '../pages/Product'
import ProductViewModal from './ProductViewModal'
import Accessories from '../pages/Accessories'
import Contact from '../pages/Contact'
const Layout = () => {
  return (
    <div>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/catalog' element={<Catalog/>} />
          <Route path='/catalog/:slug' element={<Product/>}/>
          <Route path='/accessories' element={<Accessories/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      <ProductViewModal/>
      <Footer/>
    </div>
  )
}

export default Layout