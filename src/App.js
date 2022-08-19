import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Hooks/auth';
import MainApp from './routes';
import Login from './routes/Login';

function App() {
  const auth = useAuth();
  return (
    <>
      {
        auth?.isValidate 
        ? <MainApp/> 
        : <Routes>
            <Route exact path="*" element={<Navigate to="/login"/>}/>
            <Route exact path="/login" element={<Login/>}/>
          </Routes>
      }
    </>
  );
}

export default App;
