import React from 'react'
import { Route, Routes } from 'react-router-dom';
import BackLayout from '../Layouts/BackLayout/Main';
import { 
  AddAviario,
  AddCiclo,
  AddColeta,
  AddEnvio,
  AddLote,
  Aviarios,
  Ciclos,
  Coletas,
  EditAviario,
  EditColeta,
  EditEnvio,
  EditLote,
  Envios,
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
        <Route path='/coletas/addcoleta' element={<AddColeta />} />
        <Route path='/coletas/editcoleta' element={<EditColeta />} />
        <Route path='/envios' element={<Envios />} />
        <Route path='/envios/addenvio' element={<AddEnvio />} />
        <Route path='/envios/editenvio' element={<EditEnvio />} />
      </Route>
      
    </Routes>
  )
}

export default BackRoutes;