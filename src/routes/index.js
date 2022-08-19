import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './Menu';
import Orders from './Orders';
import Dishes from './Dishes';
import NotFound from './NotFound';
import Reports from './Reports'
import LayoutApp from '../components/LayoutApp';
import Configuration from './configurations';

function App() {
  return (
    <LayoutApp>
      <Routes>
          <Route exact path="/" element={<Navigate to="/home"/>}/>
          <Route exact path="/home" element={<Menu/>}/>
          <Route exact path="/orders" element={<Orders/>}/>
          <Route exact path="/dishes" element={<Dishes/>}/>
          <Route exact path="/reports/*" element={<Reports/>}/>
          <Route exact path="/configuration/*" element={<Configuration/>}/>
          <Route path='*' element={<NotFound/>}/>
      </Routes>
    </LayoutApp>
  );
}

export default App;
