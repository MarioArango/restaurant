import React from 'react'
import { useAuth } from './Hooks/auth';
import MainApp from './routes';
import Login from './routes/Login';

function App() {
  const auth = useAuth();
  return (
    <>
      {
        auth?.isValidate ? <MainApp/> : <Login/>
      }
    </>
  );
}

export default App;
