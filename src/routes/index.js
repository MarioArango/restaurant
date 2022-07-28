import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import Orders from './Orders';
import Dishes from './Dishes';
import Sales from './reports/Sales';
import NotFound from './NotFound';
import Users from './configurations/Users';
import BranchOffices from './configurations/BranchOffiices';
import TypesProducts from './configurations/TypesProducts';
import LayoutApp from '../components/LayoutApp';

function App() {
  return (
    <LayoutApp>
        <Routes>
            <Route exact path="/" element={<Menu/>}/>
            <Route exact path="/orders" element={<Orders/>}/>
            <Route exact path="/users" element={<Users/>} />
            <Route exact path="/branch-offices" element={<BranchOffices/>}/>
            <Route exact path="/dishes" element={<Dishes/>}/>
            <Route exact path="/sales" element={<Sales/>}/>
            <Route exact path="/types-products" element={<TypesProducts/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </LayoutApp>
  );
}

export default App;
