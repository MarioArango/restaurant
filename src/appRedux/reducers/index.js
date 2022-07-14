import { combineReducers } from 'redux-immutable';
import Menu from './Menu';

const reducers = combineReducers({
    menus: Menu
})

export default reducers;

