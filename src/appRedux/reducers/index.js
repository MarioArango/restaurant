import { combineReducers } from 'redux-immutable';
import BranchOffices from './BranchOffices';
import Dishes from './Dishes';
import Menu from './Menu';
import Orders from './Orders';
import Users from './Users';
import Reports from './Reports';
import TypesProducts from './TypesProducts';
import Rols from './Rols';

const rootReducer = combineReducers({
    branchOffices: BranchOffices,
    dishes: Dishes,
    menu: Menu,
    orders: Orders,
    users: Users,
    reports: Reports,
    typesProducts: TypesProducts,
    rols: Rols,
})

export default rootReducer;

