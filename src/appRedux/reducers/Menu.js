import {
    FETCH_GET_DISHES_MENU_START,
    FETCH_GET_DISHES_MENU_SUCCESS,
    FETCH_GET_DISHES_MENU_ERROR,
    FILTER_DISHES_MENU
} from "../types";


const initialState = {
    loadingListDishesMenu: false,
    listDishesMenu: [],
    listDishesMenuFilter: []
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
        
        //TODO: FILTER DISHES MENU
        case FILTER_DISHES_MENU: {
            const { nIdTypeProduct, reset } = payload;
            if(reset){
                return {
                    ...state,
                    listDishesMenuFilter: [],
                }
            }else {
                const listDishesMenuFilter = [...state.listDishesMenu].filter(d => d.nIdTypeProduct === nIdTypeProduct);
                return {
                    ...state,
                    listDishesMenuFilter
                }
            }
                
        }

        default: {
            return state;
        }
    }
};

export default Menu;
