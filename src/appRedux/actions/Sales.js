import { db } from '../../firebase/firebaseConfig';
import { collection, where, query, getDocs, addDoc } from "firebase/firestore";
import { message } from 'antd';
import {
  FETCH_ADD_ORDER_SUMARY_TOTAL_BY_CLIENT_START,
  FETCH_ADD_ORDER_SUMARY_TOTAL_BY_CLIENT_SUCCESS,
  FETCH_ADD_ORDER_SUMARY_TOTAL_BY_CLIENT_ERROR,
  FETCH_REP_SALES_START,
  FETCH_REP_SALES_SUCCESS,
  FETCH_REP_SALES_ERROR,
} from '../types'

//TODO: ADD ORDER SUMARY TOTAL FINISHED FOR SALE'S REPORT
export const rxAddOrderSummaryTotalByClient = (orderSummaryTotal) => async dispatch => {
  dispatch({type: FETCH_ADD_ORDER_SUMARY_TOTAL_BY_CLIENT_START})
  try {
    const docRef = await addDoc(collection(db, 'reportSale'), orderSummaryTotal)
    if(docRef){
      dispatch({type: FETCH_ADD_ORDER_SUMARY_TOTAL_BY_CLIENT_SUCCESS})
    }
  } catch (error) {
    dispatch({type: FETCH_ADD_ORDER_SUMARY_TOTAL_BY_CLIENT_ERROR})
    message.error('Error del servidor.')
  }
}

//TODO: SALE'S REPORT FOR BRANCHOFFICES AND RANGE TIME
export const rxReportSales = (nIdBranchOffice, from, to) => async dispatch => {
    dispatch({type: FETCH_REP_SALES_START})
    try {
      const q = query(collection(db, "reportSale"), 
                      where("nIdBranchOffice", "==", nIdBranchOffice),
                      where("dInitService", ">=", from),
                      where("dInitService", "<=", to),
                );
      const querySnapshot = await getDocs(q);
      const sales = []
      querySnapshot.forEach(doc => {
        sales.push({...doc.data(), nIdSale: doc.id}) 
      })

      const result = sales.map((s, index) => {
        let nPriceTotal = 0;
        s.orderSummaryTotal?.forEach(ot => {
          ot.dishes?.forEach(d => {
            nPriceTotal += d.nPriceTotal
          })
        })
        return {
          key: index,
          nNumberDiners: s.nNumberDiners,
          dInitService: s.dInitService,
          dRequestPayment: s.dRequestPayment,
          nPriceTotal
        }
      })
      dispatch({type: FETCH_REP_SALES_SUCCESS, payload: result})
    } catch (error) {
      dispatch({type: FETCH_REP_SALES_ERROR})
      message.error('Error del servidor.')
    }
  }
