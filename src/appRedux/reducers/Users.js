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
    SHOW_FORM_USER,
    USER_SELECTED
} from "../types";


const initialState = {
    loadingListUsers: false,
    listUsers: [],
    showFormUser: false,
    userSelected: null,
    loadingDelete: false,
    loadingCreateUser: false,
    loadingUpdateUser: false,
};

const Users = (state = initialState, { type, payload }) => {
    switch (type) {
        //TODO: GET USERS
        case FETCH_GET_USERS_START: {
            return {
                ...state,
                loadingPromotions: true
            }
        }
        case FETCH_GET_USERS_SUCCESS: {
            return {
                ...state,
                loadingListUsers: false,
                listUsers: payload
            }
        }
        case FETCH_GET_USERS_ERROR: {
            return {
                ...state,
                loadingPromotions: false
            }
        }

        //TODO: SHOW FORM USER
        case SHOW_FORM_USER: {
            return {
                ...state,
                showFormUser: payload
            }
        }

        //TODO: SHOW FORM USER
        case USER_SELECTED: {
            return {
                ...state,
                userSelected: payload
            }
        }

        //TODO: DELETE USER
        case FETCH_DELETE_USER_START: {
            return {
                ...state,
                loadingDelete: true
            }
        }
        case FETCH_DELETE_USER_SUCCESS: {
            return {
                ...state,
                loadingDelete: false
            }
        }
        case FETCH_DELETE_USER_ERROR: {
            return {
                ...state,
                loadingDelete: false
            }
        }

        //TODO: CREATE USER
        case FETCH_REGISTER_USER_START: {
            return {
                ...state,
                loadingCreateUser: true
            }
        }

        case FETCH_REGISTER_USER_SUCCESS: {
            return {
                ...state,
                loadingCreateUser: false,
                userSelected: null,
                showFormUser: false
            }
        }

        case FETCH_REGISTER_USER_ERROR: {
            return {
                ...state,
                loadingCreateUser: false
            }
        }

        //TODO: UPDATE USER
        case FETCH_UPDATE_USER_START: {
            return {
                ...state,
                loadingUpdateUser: true
            }
        }

        case FETCH_UPDATE_USER_SUCCESS: {
            return {
                ...state,
                loadingUpdateUser: false,
                userSelected: null,
                showFormUser: false
            }
        }

        case FETCH_UPDATE_USER_ERROR: {
            return {
                ...state,
                loadingUpdateUser: false
            }
        }

        default: {
            return state;
        }
    }
};

export default Users;
