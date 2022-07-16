import { combineReducers } from 'redux-immutable';
import BranchOffices from './BranchOffices';
import Dishes from './Dishes';
import Menu from './Menu';
import Orders from './Orders';
import Users from './Users';

const rootReducer = combineReducers({
    branchOffices: BranchOffices,
    dishes: Dishes,
    menu: Menu,
    orders: Orders,
    users: Users
})

export default rootReducer;

