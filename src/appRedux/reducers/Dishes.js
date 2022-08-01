import {
    FETCH_ADD_DISHES_START,
    FETCH_ADD_DISHES_SUCCESS,
    FETCH_ADD_DISHES_ERROR,
    FETCH_UPDATE_DISH_START,
    FETCH_UPDATE_DISH_SUCCESS,
    FETCH_UPDATE_DISH_ERROR,
    FETCH_GET_DISHES_START,
    FETCH_GET_DISHES_SUCCESS,
    FETCH_GET_DISHES_ERROR,
    DISH_SELECTED,
    SHOW_FORM_DISHES,
    FETCH_DELETE_DISH_START,
    FETCH_DELETE_DISH_SUCCESS,
    FETCH_DELETE_DISH_ERROR,
} from "../types";


const initialState = {
    loadingListDishes: false,
    listDishes: [],
    listDishesFilter: [],
    dishSelected: null,
    showFormDishes: null,
    loadingDeleteDish: false,
    loadingAddDish: false,
    loadingUpdateDish: false,
};

const Menu = (state = initialState, { type, payload }) => {
    switch (type) {
        //TODO: GET ALL DISHES
        case FETCH_GET_DISHES_START: {
            return {
                ...state,
                loadingListDishes: true
            }
        }
        case FETCH_GET_DISHES_SUCCESS: {
            return {
                ...state,
                loadingListDishes: false,
                listDishes: payload
            }
        }
        case FETCH_GET_DISHES_ERROR: {
            return {
                ...state,
                loadingListDishes: false
            }
        }

        //TODO:
        case DISH_SELECTED: {
            return {
                ...state,
                dishSelected: payload
            }
        }

        //TODO:
        case SHOW_FORM_DISHES: {
            return {
                ...state,
                showFormDishes: payload
            }
        }

        //TODO: DELETE DISH
        case FETCH_DELETE_DISH_START: {
            return {
                ...state,
                loadingDeleteDish: true
            }
        }

        case FETCH_DELETE_DISH_SUCCESS: {
            return {
                ...state,
                loadingDeleteDish: false
            }
        }

        case FETCH_DELETE_DISH_ERROR: {
            return {
                ...state,
                loadingDeleteDish: false
            }
        }
        //TODO: ADD DISH
        case FETCH_ADD_DISHES_START: {
            return {
                ...state,
                loadingAddDish: true
            }
        }

        case FETCH_ADD_DISHES_SUCCESS: {
            return {
                ...state,
                loadingAddDish: false,
                showFormDishes: false
            }
        }

        case FETCH_ADD_DISHES_ERROR: {
            return {
                ...state,
                loadingAddDish: false
            }
        }
        //TODO: UPDATE DISH
        case FETCH_UPDATE_DISH_START: {
            return {
                ...state,
                loadingUpdateDish: true
            }
        }

        case FETCH_UPDATE_DISH_SUCCESS: {
            return {
                ...state,
                loadingUpdateDish: false,
                showFormDishes: false,
            }
        }

        case FETCH_UPDATE_DISH_ERROR: {
            return {
                ...state,
                loadingUpdateDish: false
            }
        }

        default: {
            return state;
        }
    }
};

export default Menu;
