import {
    FETCH_REGISTER_BRANCHOFFICE_START,
    FETCH_REGISTER_BRANCHOFFICE_SUCCESS,
    FETCH_REGISTER_BRANCHOFFICE_ERROR,
    FETCH_GET_BRANCHOFFICES_START,
    FETCH_GET_BRANCHOFFICES_SUCCESS,
    FETCH_GET_BRANCHOFFICES_ERROR,
    FETCH_DELETE_BRANCHOFFICE_START,
    FETCH_DELETE_BRANCHOFFICE_SUCCESS,
    FETCH_DELETE_BRANCHOFFICE_ERROR,
    SHOW_FORM_BRANCHOFFICE,
    BRANCHOFFICE_SELECTED,
    FETCH_UPDATE_BRANCHOFFICE_START,
    FETCH_UPDATE_BRANCHOFFICE_SUCCESS,
    FETCH_UPDATE_BRANCHOFFICE_ERROR
} from "../types";


const initialState = {
    loadingListBranchOff: false,
    listBranchOffices: [],
    showFormBranchOffice: false,
    branchOfficeSelected: null,
    loadingDeleteBranchOff: false,
    loadingCreateBranchOff: false,
    loadingUpdateBranchOff: false
};

const BranchOffices = (state = initialState, { type, payload }) => {
    switch (type) {
          //TODO: GET BRACHOFFICES
          case FETCH_GET_BRANCHOFFICES_START: {
            return {
                ...state,
                loadingListBranchOff: true
            }
        }
        case FETCH_GET_BRANCHOFFICES_SUCCESS: {
            return {
                ...state,
                loadingListBranchOff: false,
                listBranchOffices: payload
            }
        }
        case FETCH_GET_BRANCHOFFICES_ERROR: {
            return {
                ...state,
                loadingPromotions: false
            }
        }

        //TODO: SHOW FORM BRACHOFFICE
        case SHOW_FORM_BRANCHOFFICE: {
            return {
                ...state,
                showFormBranchOffice: payload
            }
        }

        //TODO: SELECTED BRACHOFFICE
        case BRANCHOFFICE_SELECTED: {
            return {
                ...state,
                branchOfficeSelected: payload
            }
        }

        //TODO: DELETE BRACHOFFICE
        case FETCH_DELETE_BRANCHOFFICE_START: {
            return {
                ...state,
                loadingDeleteBranchOff: true
            }
        }
        case FETCH_DELETE_BRANCHOFFICE_SUCCESS: {
            return {
                ...state,
                loadingDeleteBranchOff: false
            }
        }
        case FETCH_DELETE_BRANCHOFFICE_ERROR: {
            return {
                ...state,
                loadingDeleteBranchOff: false
            }
        }

        //TODO: CREATE BRACHOFFICE
        case FETCH_REGISTER_BRANCHOFFICE_START: {
            return {
                ...state,
                loadingCreateBranchOff: true
            }
        }

        case FETCH_REGISTER_BRANCHOFFICE_SUCCESS: {
            return {
                ...state,
                loadingCreateBranchOff: false,
                branchOfficeSelected: null,
                showFormBranchOffice: false
            }
        }

        case FETCH_REGISTER_BRANCHOFFICE_ERROR: {
            return {
                ...state,
                loadingCreateBranchOff: false
            }
        }

        //TODO: UPDATE BRACHOFFICE
        case FETCH_UPDATE_BRANCHOFFICE_START: {
            return {
                ...state,
                loadingUpdateBranchOff: true
            }
        }

        case FETCH_UPDATE_BRANCHOFFICE_SUCCESS: {
            return {
                ...state,
                loadingUpdateBranchOff: false,
                branchOfficeSelected: null,
                showFormBranchOffice: false
            }
        }

        case FETCH_UPDATE_BRANCHOFFICE_ERROR: {
            return {
                ...state,
                loadingUpdateBranchOff: false
            }
        }

        default: {
            return state;
        }
    }
};

export default BranchOffices;
