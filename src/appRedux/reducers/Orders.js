import {
    FETCH_GENERATE_ORDER_START,
    FETCH_GENERATE_ORDER_SUCCESS,
    FETCH_GENERATE_ORDER_ERROR,
    FETCH_GET_ORDERS_START,
    FETCH_GET_ORDERS_SUCCESS,
    FETCH_GET_ORDERS_ERROR,
    FETCH_UPDATE_ORDER_START,
    FETCH_UPDATE_ORDER_SUCCESS,
    FETCH_UPDATE_ORDER_ERROR,
    ORDER_SELECTED,
    ORDER_DISH_SELECTED,
    SHOW_ORDER_SUMMARY,
    ORDER_SUMMARY,
    ORDER_SUMMARY_TOTAL,
    CLEAR_ALL_ORDER_SUMMARY
} from "../types";

const initialState = {
    loadingGenerateOrder: false,
    loadingGetOrders: false,
    listOrders: [],
    orderSelected: null,
    orderDishSelected: null,
    loadingUpdateStateOrders: false,
    showOrderSummary: false,
    orderSummary: [],
    orderSummaryTotal: JSON.parse(localStorage.getItem('orderSummaryTotal')??'[]')
};

const Orders = (state = initialState, { type, payload }) => {
    switch (type) {
        //TODO: GENERATE ORDERS
        case FETCH_GENERATE_ORDER_START: {
            return {
                ...state,
                loadingGenerateOrder: true
            }
        }
        
        case FETCH_GENERATE_ORDER_SUCCESS: {
            return {
                ...state,
                loadingGenerateOrder: false,
                orderSummary: [],
                showOrderSummary: false
            }
        }

        case FETCH_GENERATE_ORDER_ERROR: {
            return {
                ...state,
                loadingGenerateOrder: false
            }
        }
        
        //TODO: GET ORDERS
        case FETCH_GET_ORDERS_START: {
            return {
                ...state,
                loadingGetOrders: true
            }
        }
        
        case FETCH_GET_ORDERS_SUCCESS: {
            return {
                ...state,
                loadingGetOrders: false,
                listOrders: payload
            }
        }

        case FETCH_GET_ORDERS_ERROR: {
            return {
                ...state,
                loadingGetOrders: false
            }
        }

        //TODO: ORDER SELECTED
        case ORDER_SELECTED: {
            return {
                ...state,
                orderSelected: payload
            }
        }

        //TODO: ORDER SELECTED
        case ORDER_DISH_SELECTED: {
            return {
                ...state,
                orderDishSelected: payload
            }
        }

        //TODO: UPDATE STATE ORDER
        case FETCH_UPDATE_ORDER_START: {
            return {
                ...state,
                loadingUpdateStateOrders: true
            }
        }
        
        case FETCH_UPDATE_ORDER_SUCCESS: {
            return {
                ...state,
                loadingUpdateStateOrders: false,
                orderSelected: null,
                orderDishSelected: null
            }
        }

        case FETCH_UPDATE_ORDER_ERROR: {
            return {
                ...state,
                loadingUpdateStateOrders: false
            }
        }

        //TODO: SHOW ORDER SUMMARY
        case SHOW_ORDER_SUMMARY: {
            return {
                ...state,
                showOrderSummary: payload
            }
        }

        //TODO: ORDER SUMMARY
        case ORDER_SUMMARY: {
            return {
                ...state,
                orderSummary: payload
            }
        }

        //TODO: ORDER SUMMARY TOTAL
        case ORDER_SUMMARY_TOTAL: {
            return {
                ...state,
                orderSummaryTotal: [
                    ...state.orderSummaryTotal,
                    payload
                ]
            }
        }

        //TODO: CLEAR ALL ORDER SUMMARY
        case CLEAR_ALL_ORDER_SUMMARY: {
            localStorage.removeItem('orderSummaryTotal');
            return {
                ...state,
                orderSummary: [],
                orderSummaryTotal: []
            }
        }

        default: {
            return state;
        }
    }
};

export default Orders;
