import {
    FETCH_REP_SALES_START,
    FETCH_REP_SALES_SUCCESS,
    FETCH_REP_SALES_ERROR,
} from "../types";


const initialState = {
    loadingListSales: false,
    listSales: []
};

const Sales = (state = initialState, { type, payload }) => {
    switch (type) {
        //TODO: GET SALES
        case FETCH_REP_SALES_START: {
            return {
                ...state,
                loadingListSales: true
            }
        }
        case FETCH_REP_SALES_SUCCESS: {
            return {
                ...state,
                loadingListSales: false,
                listSales: payload
            }
        }
        case FETCH_REP_SALES_ERROR: {
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
