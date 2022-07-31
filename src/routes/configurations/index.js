import React from 'react'
import { Routes, Route } from 'react-router-dom';
import NotFound from '../NotFound'
import BranchOffices from './BranchOffiices';
import TypesProducts from './TypesProducts';
import Users from './Users';

function Configuration() {
  return (
    <Routes>
        <Route exact path="types-products" element={<TypesProducts/>}/>
        <Route exact path="users" element={<Users/>} />
        <Route exact path="branch-offices" element={<BranchOffices/>}/>
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  );
}

export default Configuration;
