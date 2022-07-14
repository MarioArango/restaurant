import { message } from 'antd';
import {
    FETCH_GENERATE_ORDER_START,
    FETCH_GENERATE_ORDER_SUCCESS,
    FETCH_GENERATE_ORDER_ERROR,
    FETCH_GET_ORDERS_START,
    FETCH_GET_ORDERS_SUCCESS,
    FETCH_GET_ORDERS_ERROR,
    FETCH_UPDATE_ORDER_START,
    FETCH_UPDATE_ORDER_SUCCESS,
    FETCH_UPDATE_ORDER_ERROR
} from "../types";


const initialState = {
};

const Orders = (state = initialState, { type, payload }) => {
    switch (type) {
        // //FILTER PROMOTIONS
        // case START_FILTER_PROMOTIONS: {
        //     return {
        //         ...state,
        //         loadingPromotions: true
        //     }
        // }
        // case SUCCESS_FILTER_PROMOTIONS: {
        //     return {
        //         ...state,
        //         loadingPromotions: false,
        //         promotionsList: payload
        //     }
        // }
        // case ERROR_FILTER_PROMOTIONS: {
        //     return {
        //         ...state,
        //         loadingPromotions: false
        //     }
        // }

        default: {
            return state;
        }
    }
};

export default Orders;
