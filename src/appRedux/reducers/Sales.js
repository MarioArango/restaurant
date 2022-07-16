import {
    FETCH_GET_SALES_START,
    FETCH_GET_SALES_SUCCESS,
    FETCH_GET_SALES_ERROR,
} from "../types";


const initialState = {
    loadingListSales: false,
    listSales: []
};

const Sales = (state = initialState, { type, payload }) => {
    switch (type) {
        //TODO: GET SALES
        case FETCH_GET_SALES_START: {
            return {
                ...state,
                loadingListSales: true
            }
        }
        case FETCH_GET_SALES_SUCCESS: {
            return {
                ...state,
                loadingListSales: false,
                listSales: payload
            }
        }
        case FETCH_GET_SALES_ERROR: {
            return {
                ...state,
                loadingListSales: false
            }
        }

        default: {
            return state;
        }
    }
};

export default Sales;
