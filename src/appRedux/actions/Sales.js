import { db } from '../../firebase/firebaseConfig';
import { collection, where, query, getDocs } from "firebase/firestore";
import { message } from 'antd';

import {
    FETCH_REP_SALES_START,
    FETCH_REP_SALES_SUCCESS,
    FETCH_REP_SALES_ERROR,
} from '../types'

export const rxReportSales = (nIdBranchOffice, rangeDate) => async dispatch => {
    dispatch({type: FETCH_REP_SALES_START})
    try {
      const q = query(collection(db, "orders"), 
                      where("nIdBranchOffice", "==", nIdBranchOffice),
                      // where("rangeDate", "==", rangeDate),
                      // where("nIdBranchOffice", "==", nIdBranchOffice),
                    );
      const querySnapshot = await getDocs(q);
      const sales = []
      querySnapshot.forEach(doc => {
        sales.push({...doc.data(), nIdOrder: doc.id}) 
      })
      const result = sales.map(o => {
        let nPriceTotal = 0;
        o.dishes?.forEach(d => {
          nPriceTotal += d.nPriceTotal
        })
        return {
          ...o,
          nPriceTotal
        }
      })
      dispatch({type: FETCH_REP_SALES_SUCCESS, payload: result})
    } catch (error) {
    dispatch({type: FETCH_REP_SALES_ERROR})
      message.error('Error del servidor.')
    }
  }
