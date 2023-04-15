import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import Signup from '../pages/signup'
import Home from '../pages/home'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
    </Routes>
  )
}

export default AllRoutes
