import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Orders from './routes/Orders';
import Dishes from './routes/Dishes';
import Login from './routes/Login';
import Users from './routes/Users';
import { AuthProvider } from './context/AuthContext';
import RestrictedComponent from './components/RestrictedComponent';
import { useAuth } from './context/AuthContext';

function App() {
  const auth = useAuth();
  return (
    <div className='bg-fondo h-screen'>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<RestrictedComponent auth={auth}><Home/></RestrictedComponent>} />
          <Route exact path="/orders" element={<RestrictedComponent auth={auth}><Orders/></RestrictedComponent>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/users" element={<RestrictedComponent auth={auth}><Users/></RestrictedComponent>} />
          <Route exact path="/add-dishes" element={<RestrictedComponent auth={auth}><Dishes/></RestrictedComponent>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
