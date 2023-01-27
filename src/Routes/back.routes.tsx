import React from 'react'
import { Route, Routes } from 'react-router-dom';
import BackLayout from '../Layouts/BackLayout/Main';
import Home from '../Pages/Home';

function BackRoutes() {
  return (
    <Routes>
        <Route element={<BackLayout />} >
            <Route index element={<Home />} />
            <Route path='/' element={<Home />} />
        </Route>
    </Routes>
  )
}

export default BackRoutes;