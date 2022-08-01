import {
    // FETCH_ADD_ORDER_SUMARY_TOTAL_BY_CLIENT_START,
    // FETCH_ADD_ORDER_SUMARY_TOTAL_BY_CLIENT_SUCCESS,
    // FETCH_ADD_ORDER_SUMARY_TOTAL_BY_CLIENT_ERROR,
    FETCH_REP_SALES_START,
    FETCH_REP_SALES_SUCCESS,
    FETCH_REP_SALES_ERROR,
    FETCH_REP_ORDERS_START,
    FETCH_REP_ORDERS_SUCCESS,
    FETCH_REP_ORDERS_ERROR,
    FETCH_REP_RATES_START,
    FETCH_REP_RATES_SUCCESS,
    FETCH_REP_RATES_ERROR
} from "../types";


const initialState = {
    loadingListReportSales: false,
    listReportSales: [],

    loadingListReportOrders: false,
    listReportOrders: [],

    loadingListReportRates: false,
    listReportRates: []
};

const Reports = (state = initialState, { type, payload }) => {
    switch (type) {
        //TODO: GET REPORT SALES
        case FETCH_REP_SALES_START: {
            return {
                ...state,
                loadingListReportSales: true
            }
        }
        case FETCH_REP_SALES_SUCCESS: {
            return {
                ...state,
                loadingListReportSales: false,
                listReportSales: payload
            }
        }
        case FETCH_REP_SALES_ERROR: {
            return {
                ...state,
                loadingListReportSales: false
            }
        }
        //TODO: GET REPORT ORDERS
        case FETCH_REP_ORDERS_START: {
            return {
                ...state,
                loadingListReportOrders: true
            }
        }
        case FETCH_REP_ORDERS_SUCCESS: {
            return {
                ...state,
                loadingListReportOrders: false,
                listReportOrders: payload
            }
        }
        case FETCH_REP_ORDERS_ERROR: {
            return {
                ...state,
                loadingListReportOrders: false
            }
        }
        
        //TODO: GET REPORT RATE
        case FETCH_REP_RATES_START: {
            return {
                ...state,
                loadingListReportRates: true
            }
        }
        case FETCH_REP_RATES_SUCCESS: {
            return {
                ...state,
                loadingListReportRates: false,
                listReportRates: payload
            }
        }
        case FETCH_REP_RATES_ERROR: {
            return {
                ...state,
                loadingListReportRates: false
            }
        }

        default: {
            return state;
        }
    }
};

export default Reports;
