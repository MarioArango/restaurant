import { message } from 'antd';
import {
    FETCH_REGISTER_USER_START,
    FETCH_REGISTER_USER_SUCCESS,
    FETCH_REGISTER_USER_ERROR,
    FETCH_UPDATE_USER_START,
    FETCH_UPDATE_USER_SUCCESS,
    FETCH_UPDATE_USER_ERROR,
    FETCH_GET_USERS_START,
    FETCH_GET_USERS_SUCCESS,
    FETCH_GET_USERS_ERROR,
    FETCH_DELETE_USER_START,
    FETCH_DELETE_USER_SUCCESS,
    FETCH_DELETE_USER_ERROR,
    FETCH_LOGIN_USER_START,
    FETCH_LOGIN_USER_SUCCESS,
    FETCH_LOGIN_USER_ERROR,
} from "../types";


const initialState = {
};

const Users = (state = initialState, { type, payload }) => {
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

export default Users;
