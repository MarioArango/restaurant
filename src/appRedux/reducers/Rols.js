import {
  FETCH_ADD_ROL_START,
  FETCH_ADD_ROL_SUCCESS,
  FETCH_ADD_ROL_ERROR,
  FETCH_UPDATE_ROL_START,
  FETCH_UPDATE_ROL_SUCCESS,
  FETCH_UPDATE_ROL_ERROR,
  FETCH_DEL_ROL_START,
  FETCH_DEL_ROL_SUCCESS,
  FETCH_DEL_ROL_ERROR,
  FETCH_GET_ROLS_START,
  FETCH_GET_ROLS_SUCCESS,
  FETCH_GET_ROLS_ERROR,
  SHOW_FORM_ROL,
  ROL_SELECTED,
} from '../types';

const initialState = {
    loadingListRols: false,
    listRols: [],
    showFormRol: false,
    rolSelected: null,
    loadingDeleteRol: false,
    loadingCreateRol: false,
    loadingUpdateRol: false,
}

const Rols = (state = initialState, { type, payload }) => {
    switch (type) {
        //TODO: GET ROLS
        case FETCH_GET_ROLS_START: {
            return {
                ...state,
                loadingListRols: true
            }
        }
        case FETCH_GET_ROLS_SUCCESS: {
            return {
                ...state,
                loadingListRols: false,
                listRols: payload
            }
        }
        case FETCH_GET_ROLS_ERROR: {
            return {
                ...state,
                loadingListRols: false
            }
        }

        //TODO: SHOW FORM ROL
        case SHOW_FORM_ROL: {
            return {
                ...state,
                showFormRol: payload
            }
        }

        //TODO: SHOW FORM ROL
        case ROL_SELECTED: {
            return {
                ...state,
                rolSelected: payload
            }
        }

        //TODO: DELETE ROL
        case FETCH_DEL_ROL_START: {
            return {
                ...state,
                loadingDeleteRol: true
            }
        }
        case FETCH_DEL_ROL_SUCCESS: {
            return {
                ...state,
                loadingDeleteRol: false
            }
        }
        case FETCH_DEL_ROL_ERROR: {
            return {
                ...state,
                loadingDeleteRol: false
            }
        }

        //TODO: CREATE ROL
        case FETCH_ADD_ROL_START: {
            return {
                ...state,
                loadingCreateRol: true
            }
        }

        case FETCH_ADD_ROL_SUCCESS: {
            return {
                ...state,
                loadingCreateRol: false,
                rolSelected: null,
                showFormRol: false
            }
        }

        case FETCH_ADD_ROL_ERROR: {
            return {
                ...state,
                loadingCreateRol: false
            }
        }

        //TODO: UPDATE ROL
        case FETCH_UPDATE_ROL_START: {
            return {
                ...state,
                loadingUpdateRol: true
            }
        }

        case FETCH_UPDATE_ROL_SUCCESS: {
            return {
                ...state,
                loadingUpdateRol: false,
                rolSelected: null,
                showFormRol: false
            }
        }

        case FETCH_UPDATE_ROL_ERROR: {
            return {
                ...state,
                loadingUpdateRol: false
            }
        }

        default: {
            return state;
        }
    }
}

export default Rols;