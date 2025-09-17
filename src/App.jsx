import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Promotion from './pages/Promotion'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'



function App() {
  return (
    <>
      <BrowserRouter>
        <div className='main-container'>
          <Header />
          <div className='content-container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/promotion' element={<Promotion />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      
    </>
  )
}

export default App
