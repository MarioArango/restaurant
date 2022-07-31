import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Rates from './Rates';
import Sales from './Sales';
import Orders from './Orders';
import NotFound from '../NotFound'

function Reports() {
  return (
    <Routes>
        <Route exact path="sales" element={<Sales/>}/>
        <Route exact path="time-orders" element={<Orders/>}/>
        <Route exact path="rates" element={<Rates/>} />
        <Route path='*' element={<NotFound/>}/>
    </Routes>
  );
}

export default Reports;
