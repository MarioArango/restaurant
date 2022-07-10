import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddDish from './routes/AddDishes';
import ListDishes from './routes/ListDishes';
import Login from './routes/Login';
import Users from './routes/Users';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className='bg-fondo h-screen'>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<ListDishes/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/users" element={<Users/>} />
          <Route exact path="/add-dishes" element={<AddDish/>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
