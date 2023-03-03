import React from 'react'
import { Route, Routes } from 'react-router-dom';
import BackLayout from '../Layouts/BackLayout/Main';
import { 
  AddAviario,
  AddCiclo,
  AddLote,
  Aviarios,
  Ciclos,
  Coletas,
  EditAviario,
  EditLote,
  Home,
  Lotes 
} from "../Pages";


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
        <Route path='/aviarios' element={<Aviarios />} />
        <Route path='/aviarios/addaviario' element={<AddAviario />} />
        <Route path='/aviarios/editaviario' element={<EditAviario />} />
        <Route path='/coletas' element={<Coletas />} />
      </Route>
    </Routes>
  )
}

export default BackRoutes;