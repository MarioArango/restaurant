import React from 'react'
import { Switch, Route } from 'react-router-dom';
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
        <Switch>
            <Route exact path="/" component={<Menu/>}/>
            <Route exact path="/orders" component={<Orders/>}/>
            <Route exact path="/users" component={<Users/>} />
            <Route exact path="/branch-offices" component={<BranchOffices/>}/>
            <Route exact path="/dishes" component={<Dishes/>}/>
            <Route exact path="/sales" component={<Sales/>}/>
            <Route exact path="/types-products" component={<TypesProducts/>}/>
            <Route path='*' component={<NotFound/>}/>
        </Switch>
    </LayoutApp>
  );
}

export default App;
