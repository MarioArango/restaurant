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
  FETCH_REP_ORDERS_START,
  FETCH_REP_ORDERS_SUCCESS,
  FETCH_REP_ORDERS_ERROR,
  FETCH_REP_RATES_START,
  FETCH_REP_RATES_SUCCESS,
  FETCH_REP_RATES_ERROR
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
export const rxReportSales = (nIdBranchOffice, from, to, nNumberTable) => async dispatch => {
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

      let result = sales.map(s => {
        let nPriceTotal = 0;
        s.orderSummaryTotal?.forEach(ot => {
          ot.dishes?.forEach(d => {
            nPriceTotal += d.nPriceTotal
          })
        })
        return {
          nIdSale: s.nIdSale,
          nNumberTable: s.nNumberTable,
          nNumberDiners: s.nNumberDiners,
          dInitService: s.dInitService,
          dRequestPayment: s.dRequestPayment,
          nPriceTotal
        }
      })

      if(nNumberTable){
        result = result.filter(r => Number(r.nNumberTable)=== Number(nNumberTable))
      }
      dispatch({type: FETCH_REP_SALES_SUCCESS, payload: result})
    } catch (error) {
      dispatch({type: FETCH_REP_SALES_ERROR})
      message.error('Error del servidor.')
    }
  }

  //TODO: ORDER'S REPORT FOR BRANCHOFFICES AND RANGE TIME
export const rxReportOrders = (nIdBranchOffice, from, to, nNumberTable) => async dispatch => {
  dispatch({type: FETCH_REP_ORDERS_START})
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

    let dishes = [];
    sales.forEach(s => {
      s.orderSummaryTotal?.forEach(ot => {
        ot.dishes?.forEach(d => {
          const dish = {
            nIdDish: d.nIdDish,
            sName: d.sName,
            nNumberTable: ot.nNumberTable,
            dCreated: ot.dCreated,
            dDelivered: ot.dDelivered,
          };
          dishes.push(dish)
        })
      })
    })

    if(nNumberTable){
      dishes = dishes.filter(d => Number(d.nNumberTable) === Number(nNumberTable))
    }

    dispatch({type: FETCH_REP_ORDERS_SUCCESS, payload: dishes})
  } catch (error) {
    dispatch({type: FETCH_REP_ORDERS_ERROR})
    message.error('Error del servidor.')
  }
}

  //TODO: RATE'S REPORT FOR BRANCHOFFICES AND RANGE TIME
  export const rxReportRates = (nIdBranchOffice, from, to, nNumberTable) => async dispatch => {
    dispatch({type: FETCH_REP_RATES_START})
    try {
      const q = query(collection(db, "rates"), 
                where("nIdBranchOffice", "==", nIdBranchOffice),
                where("dCreated", ">=", from),
                where("dCreated", "<=", to),
            );
      
      const querySnapshot = await getDocs(q);
      let rates = [];
      querySnapshot.forEach(doc => {
        rates.push({...doc.data(), nIdRate: doc.id}) 
      })  

      if(nNumberTable){
        rates = rates.filter(r => Number(r.nNumberTable) === Number(nNumberTable))
      }

      dispatch({type: FETCH_REP_RATES_SUCCESS, payload: rates})
    } catch (error) {
      dispatch({type: FETCH_REP_RATES_ERROR})
      message.error('Error del servidor.')
    }
  }

