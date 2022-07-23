import {
    FETCH_REGISTER_TYPE_PRODUCT_START,
    FETCH_REGISTER_TYPE_PRODUCT_SUCCESS,
    FETCH_REGISTER_TYPE_PRODUCT_ERROR,
    FETCH_GET_TYPES_PRODUCTS_START,
    FETCH_GET_TYPES_PRODUCTS_SUCCESS,
    FETCH_GET_TYPES_PRODUCTS_ERROR,
    FETCH_DELETE_TYPE_PRODUCT_START,
    FETCH_DELETE_TYPE_PRODUCT_SUCCESS,
    FETCH_DELETE_TYPE_PRODUCT_ERROR,
    SHOW_FORM_TYPE_PRODUCT,
    TYPE_PRODUCT_SELECTED,
    FETCH_UPDATE_TYPE_PRODUCT_START,
    FETCH_UPDATE_TYPE_PRODUCT_SUCCESS,
    FETCH_UPDATE_TYPE_PRODUCT_ERROR
} from "../types";


const initialState = {
    loadingListTypesProducts: false,
    listTypesProducts: [],
    showFormTypeProduct: false,
    typeProductSelected: null,
    loadingDeleteTypeProduct: false,
    loadingCreateTypeProduct: false,
    loadingUpdateTypeProduct: false
};

const TypesProducts = (state = initialState, { type, payload }) => {
    switch (type) {
          //TODO: GET BRACHOFFICES
          case FETCH_GET_TYPES_PRODUCTS_START: {
            return {
                ...state,
                loadingListTypesProducts: true
            }
        }
        case FETCH_GET_TYPES_PRODUCTS_SUCCESS: {
            return {
                ...state,
                loadingListTypesProducts: false,
                listTypesProducts: payload
            }
        }
        case FETCH_GET_TYPES_PRODUCTS_ERROR: {
            return {
                ...state,
                loadingPromotions: false
            }
        }

        //TODO: SHOW FORM BRACHOFFICE
        case SHOW_FORM_TYPE_PRODUCT: {
            return {
                ...state,
                showFormTypeProduct: payload
            }
        }

        //TODO: SELECTED BRACHOFFICE
        case TYPE_PRODUCT_SELECTED: {
            return {
                ...state,
                typeProductSelected: payload
            }
        }

        //TODO: DELETE BRACHOFFICE
        case FETCH_DELETE_TYPE_PRODUCT_START: {
            return {
                ...state,
                loadingDeleteTypeProduct: true
            }
        }
        case FETCH_DELETE_TYPE_PRODUCT_SUCCESS: {
            return {
                ...state,
                loadingDeleteTypeProduct: false
            }
        }
        case FETCH_DELETE_TYPE_PRODUCT_ERROR: {
            return {
                ...state,
                loadingDeleteTypeProduct: false
            }
        }

        //TODO: CREATE BRACHOFFICE
        case FETCH_REGISTER_TYPE_PRODUCT_START: {
            return {
                ...state,
                loadingCreateTypeProduct: true
            }
        }

        case FETCH_REGISTER_TYPE_PRODUCT_SUCCESS: {
            return {
                ...state,
                loadingCreateTypeProduct: false,
                typeProductSelected: null,
                showFormTypeProduct: false
            }
        }

        case FETCH_REGISTER_TYPE_PRODUCT_ERROR: {
            return {
                ...state,
                loadingCreateTypeProduct: false
            }
        }

        //TODO: UPDATE BRACHOFFICE
        case FETCH_UPDATE_TYPE_PRODUCT_START: {
            return {
                ...state,
                loadingUpdateTypeProduct: true
            }
        }

        case FETCH_UPDATE_TYPE_PRODUCT_SUCCESS: {
            return {
                ...state,
                loadingUpdateTypeProduct: false,
                typeProductSelected: null,
                showFormTypeProduct: false
            }
        }

        case FETCH_UPDATE_TYPE_PRODUCT_ERROR: {
            return {
                ...state,
                loadingUpdateTypeProduct: false
            }
        }

        default: {
            return state;
        }
    }
};

export default TypesProducts;
