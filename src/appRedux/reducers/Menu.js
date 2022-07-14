// import { message } from 'antd';
// import {
   
// } from "constants/types";


const initialState = {
};

const Menu = (state = initialState, { type, payload }) => {
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

export default Menu;
