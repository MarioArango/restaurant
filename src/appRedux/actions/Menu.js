// import { message } from "antd";
// import {
//     START_FILTER_PROMOTIONS,
//     SUCCESS_FILTER_PROMOTIONS,
//     ERROR_FILTER_PROMOTIONS,
// } from "constants/types";


/**
 * ----------------
 * ONLY PROMOTIONS
 * ----------------
 */
// export const rxFilterPromotions = (dataForm) => async (dispatch) => {
//     dispatch({ type: START_FILTER_PROMOTIONS })
//     try {
//         const { data } = await api({ version: "v1" }).post("/sales/discount-and-promotions/promotions/filter", dataForm);
//         if (data.success) {
//             dispatch({
//                 type: SUCCESS_FILTER_PROMOTIONS,
//                 payload: data.items
//             })
//         }
//     } catch (error) {
//         dispatch({ type: ERROR_FILTER_PROMOTIONS })
//         displayErrorApi(error)
//     }
// }

// export const rxPromotionsSelected = (payload) => ({ type: PROMOTIONS_SELECTED, payload })

