import React from 'react'
import { Route, Routes } from 'react-router-dom';
import BackLayout from '../Layouts/BackLayout/Main';
import Ciclos from '../Pages/Ciclos';
import AddCiclo from '../Pages/Ciclos/AddCiclo';
import Home from '../Pages/Home';
import Lotes from "../Pages/Lotes";
import AddLote from "../Pages/Lotes/AddLote";
import EditLote from '../Pages/Lotes/EditLote';

function BackRoutes() {
  return (
    <Routes>
        <Route element={<BackLayout />} >
            <Route index element={<Home />} />
            <Route path='/' element={<Home />} />
            <Route path='/ciclos' element={<Ciclos />} />
            <Route path='/ciclos/addciclo' element={<AddCiclo />} />
            <Route path='/lotes' element={<Lotes />} />
            <Route path='/lotes/addlote' element={<AddLote />} />
            <Route path='/lotes/editlote' element={<EditLote />} />
        </Route>
    </Routes>
  )
}

export default BackRoutes;