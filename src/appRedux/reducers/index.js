import { combineReducers } from 'redux-immutable';
import BranchOffices from './BranchOffices';
import Dishes from './Dishes';
import Menu from './Menu';
import Orders from './Orders';
import Users from './Users';
import Sales from './Sales';
import TypesProducts from './TypesProducts';

const rootReducer = combineReducers({
    branchOffices: BranchOffices,
    dishes: Dishes,
    menu: Menu,
    orders: Orders,
    users: Users,
    sales: Sales,
    typesProducts: TypesProducts,
})

export default rootReducer;

