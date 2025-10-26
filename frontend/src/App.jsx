import { useState } from 'react'

import './App.css'
import Login from '../components/account/Login'
import { Routes, Route } from 'react-router-dom'
import Profile from '../components/pages/profile'
import Navbar from '../components/pages/Navbar'
import Home from '../components/pages/Home'

function App() {

  return (
    <>
      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Login />
      </div> */}
            <Navbar />

      <Routes>
        <Route path='/login' element={<Login />} />
  <Route path='/profile' element={<Profile />} />
  <Route path='/' element={<Home />} />

</Routes>


    </>
  )
}

export default App
