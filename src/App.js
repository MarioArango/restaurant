import AddDish from './routes/AddDishes';
import ListDishes from './routes/ListDishes';
import './App.css';

function App() {
  return (
    <div className="App">
      <ListDishes/>
      <AddDish/>
    </div>
  );
}

export default App;
