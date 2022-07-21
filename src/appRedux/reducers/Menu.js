import {
    FETCH_GET_DISHES_MENU_START,
    FETCH_GET_DISHES_MENU_SUCCESS,
    FETCH_GET_DISHES_MENU_ERROR
} from "../types";


const initialState = {
    loadingListDishesMenu: false,
    listDishesMenu: []
};

const Menu = (state = initialState, { type, payload }) => {
    switch (type) {
        //TODO: GET DISHES BY TYPE SERVICE
        case FETCH_GET_DISHES_MENU_START: {
            return {
                ...state,
                loadingListDishesMenu: true
            }
        }
        case FETCH_GET_DISHES_MENU_SUCCESS: {
            return {
                ...state,
                loadingListDishesMenu: false,
                listDishesMenu: payload
            }
        }
        case FETCH_GET_DISHES_MENU_ERROR: {
            return {
                ...state,
                loadingListDishesMenu: false
            }
        }

        default: {
            return state;
        }
    }
};

export default Menu;
