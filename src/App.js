import { Routes, Route } from 'react-router-dom';
import RestrictedComponent from './components/RestrictedComponent';
import Home from './routes/Home';
import Orders from './routes/Orders';
import Dishes from './routes/Dishes';
import Login from './routes/Login';
import Users from './routes/Users';
import NotFound from './routes/NotFound';
import LayoutApp from './components/LayoutApp';

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/" element={<RestrictedComponent><LayoutApp><Home/></LayoutApp></RestrictedComponent>} />
      <Route exact path="/orders" element={<RestrictedComponent><LayoutApp><Orders/></LayoutApp></RestrictedComponent>} />
      <Route exact path="/users" element={<RestrictedComponent><LayoutApp><Users/></LayoutApp></RestrictedComponent>} />
      <Route exact path="/dishes" element={<RestrictedComponent><LayoutApp><Dishes/></LayoutApp></RestrictedComponent>} />
      <Route path='*' element={<RestrictedComponent><LayoutApp><NotFound/></LayoutApp></RestrictedComponent>}/>
    </Routes>
  );
}

export default App;
