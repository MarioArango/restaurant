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
    USER_SELECTED,
    USER_AUTH_SUCURSAL,
    USER_SET_NUMBER_TABLE,
    USER_SHOW_TYPE_SERVICE,
    FETCH_REQUEST_WAITER_START,
    FETCH_REQUEST_WAITER_SUCCESS,
    FETCH_REQUEST_WAITER_ERROR,
    FETCH_GET_REQUEST_WAITERS_START,
    FETCH_GET_REQUEST_WAITERS_SUCCESS,
    FETCH_GET_REQUEST_WAITERS_ERROR,
    USER_SHOW_RATE,
    FETCH_SEND_RATE_START,
    FETCH_SEND_RATE_SUCCESS,
    FETCH_SEND_RATE_ERROR,
    USER_CLEAR_INIT_ACCOUNT,
    FETCH_VERIFY_USER_START,
    FETCH_VERIFY_USER_SUCCESS,
    FETCH_VERIFY_USER_ERROR,
    SHOW_VERIFY_USER
} from "../types";


const initialState = {
    loadingListUsers: false,
    listUsers: [],
    
    showFormUser: false,
    
    userSelected: null,
    
    loadingDeleteUser: false,
    loadingCreateUser: false,
    loadingUpdateUser: false,
    loadingLoginUser: false,
    
    authSucursal: JSON.parse(localStorage.getItem("authSucursal"))?? null,
    authPermissions: JSON.parse(localStorage.getItem("authPermissions"))?? null,
    numberTable: localStorage.getItem("numberTable")?? null,
    
    showTypesService: false,

    loadingRequestWaiter: false,
    
    loadingListRequestWaiter: false,
    listRequestWaiter: [],

    showRate: false,
    loadingSendRate: false,

    loadingVerifyUser: false,
    verifyUser: false,

    showVerifyUser: false
};

const Users = (state = initialState, { type, payload }) => {
    switch (type) {
        //TODO: GET USERS
        case FETCH_GET_USERS_START: {
            return {
                ...state,
                loadingListUsers: true
            }
        }
        case FETCH_GET_USERS_SUCCESS: {
            const listUsers = [];
             payload?.users.forEach(u => {
                const isOk = u?.sBranchOfficesAssigned?.some(b => b.nIdBranchOffice === payload.nIdBranchOffice);
                if(isOk){
                    listUsers.push(u);
                }
            })
            return {
                ...state,
                loadingListUsers: false,
                listUsers
            }
        }
        case FETCH_GET_USERS_ERROR: {
            return {
                ...state,
                loadingListUsers: false
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
                loadingDeleteUser: true
            }
        }
        case FETCH_DELETE_USER_SUCCESS: {
            return {
                ...state,
                loadingDeleteUser: false
            }
        }
        case FETCH_DELETE_USER_ERROR: {
            return {
                ...state,
                loadingDeleteUser: false
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

        //TODO: LOGIN USER
        case FETCH_LOGIN_USER_START: {
            return {
                ...state,
                loadingLoginUser: true
            }
        }

        case FETCH_LOGIN_USER_SUCCESS: {
            return {
                ...state,
                loadingLoginUser: false,
                authSucursal: payload?.user?.sBranchOfficesAssigned[0],
                authPermissions: payload?.permissions
            }
        }

        case FETCH_LOGIN_USER_ERROR: {
            return {
                ...state,
                loadingLoginUser: false
            }
        }

        //TODO: USER AUTH SUCURSAL
        case USER_AUTH_SUCURSAL: {
            return {
                ...state,
                authSucursal: payload
            }
        }

        //TODO: USER TYPE SERVICE
        case USER_SET_NUMBER_TABLE: {
            return {
                ...state,
                numberTable: payload
            }
        }

        //TODO: USER SHOW TYPE SERVICE
        case USER_SHOW_TYPE_SERVICE: {
            return {
                ...state,
                showTypesService: payload
            }
        }

        //TODO: ADD REQUEST WAITER
        case FETCH_REQUEST_WAITER_START: {
            return {
                ...state,
                loadingRequestWaiter: true
            }
        }

        case FETCH_REQUEST_WAITER_SUCCESS: {
            return {
                ...state,
                loadingRequestWaiter: false
            }
        }

        case FETCH_REQUEST_WAITER_ERROR: {
            return {
                ...state,
                loadingRequestWaiter: false
            }
        }
        
        //TODO: GET REQUEST WAITER
        case FETCH_GET_REQUEST_WAITERS_START: {
            return {
                ...state,
                loadingListRequestWaiter: true
            }
        }

        case FETCH_GET_REQUEST_WAITERS_SUCCESS: {
            return {
                ...state,
                loadingListRequestWaiter: false,
                listRequestWaiter: payload
            }
        }

        case FETCH_GET_REQUEST_WAITERS_ERROR: {
            return {
                ...state,
                loadingListRequestWaiter: false
            }
        }

        //TODO: SHOW RATE
        case USER_SHOW_RATE: {
            return {
                ...state,
                showRate: payload
            }
        }

        //TODO: SEND RATE
        case FETCH_SEND_RATE_START: {
            return {
                ...state,
                loadingSendRate: true
            }
        }

        case FETCH_SEND_RATE_SUCCESS: {
            return {
                ...state,
                loadingSendRate: false
            }
        }

        case FETCH_SEND_RATE_ERROR: {
            return {
                ...state,
                loadingSendRate: false
            }
        }

        //TODO: CLEAR NUMBERTABLE
        case USER_CLEAR_INIT_ACCOUNT: {
            localStorage.removeItem("authSucursal");
            localStorage.removeItem("authPermissions");
            localStorage.removeItem("numberTable");
            return {
                ...state,
                authSucursal: null,
                authPermissions: null,
                numberTable: null
            }
        }
        //TODO: VERIFY USER
        case FETCH_VERIFY_USER_START: {
            return {
                ...state,
                loadingVerifyUser: true
            }
        }

        case FETCH_VERIFY_USER_SUCCESS: {
            return {
                ...state,
                loadingVerifyUser: false,
                verifyUser: payload
            }
        }

        case FETCH_VERIFY_USER_ERROR: {
            return {
                ...state,
                loadingVerifyUser: false
            }
        }
        //TODO: SHOW VERIFY USER
        case SHOW_VERIFY_USER: {
            return {
                ...state,
                showVerifyUser: payload
            }
        }

        default: {
            return state;
        }
    }
};

export default Users;
