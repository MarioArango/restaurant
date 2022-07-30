import {
    FETCH_GET_DISHES_MENU_START,
    FETCH_GET_DISHES_MENU_SUCCESS,
    FETCH_GET_DISHES_MENU_ERROR,
    FILTER_DISHES_MENU,
    INIT_SERVICE_MENU,
    FETCH_INIT_SERVICE,
    FETCH_CLEAR_INIT_SERVICE
} from "../types";


const initialState = {
    loadingListDishesMenu: false,
    listDishesMenu: [],
    listDishesMenuFilter: [],
    showInitService: false,
    initService: JSON.parse(localStorage.getItem('initService')??'[]')
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

        //TODO: SHOW MODAL INIT SERVICE
        case INIT_SERVICE_MENU: {
            return {
                ...state,
                showInitService: payload
            }
        }

        //TODO: SAVE STATE INIT SERVICE
        case FETCH_INIT_SERVICE: {
            return {
                ...state,
                initService: [payload]
            }
        }

        //TODO: CLEAR INIT SERVICE
        case FETCH_CLEAR_INIT_SERVICE: {
            localStorage.removeItem('initService');
            return {
                ...state,
                initService: []
            }
        }

        default: {
            return state;
        }
    }
};

export default Menu;
