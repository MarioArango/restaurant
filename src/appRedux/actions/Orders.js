import { db } from '../../firebase/firebaseConfig';
import { doc, addDoc, updateDoc, onSnapshot, collection, where, query, orderBy } from "firebase/firestore";
import { message } from 'antd';
import {
  FETCH_GENERATE_ORDER_START,
  FETCH_GENERATE_ORDER_SUCCESS,
  FETCH_GENERATE_ORDER_ERROR,
  FETCH_GET_ORDERS_START,
  FETCH_GET_ORDERS_SUCCESS,
  FETCH_GET_ORDERS_ERROR,
  FETCH_UPDATE_ORDER_START,
  FETCH_UPDATE_ORDER_SUCCESS,
  FETCH_UPDATE_ORDER_ERROR,
  ORDER_SELECTED,
  ORDER_DISH_SELECTED,
  SHOW_ORDER_SUMMARY,
  ORDER_SUMMARY,
  ORDER_SUMMARY_TOTAL,
  CLEAR_ALL_ORDER_SUMMARY
} from '../types'
import moment from 'moment';
import { dateFormatList } from '../../util/config';

export const rxGenerateOrder = (order, cb = null) => async dispatch => {
  dispatch({type: FETCH_GENERATE_ORDER_START})
  try {
      const docRef = await addDoc(collection(db, 'orders'), order)
      if(docRef){
        message.success("Orden generada.")
        dispatch({type: FETCH_GENERATE_ORDER_SUCCESS})
        cb && cb(docRef.id)
      }
    } catch (error) {
      dispatch({type: FETCH_GENERATE_ORDER_ERROR})
      message.error('Error del servidor.')
    }
  }
  
  export const rxGetOrders = (nIdBranchOffice, typeService, cb = null) => async dispatch => {
    console.log(nIdBranchOffice, "rxGetOrders")
    dispatch({type: FETCH_GET_ORDERS_START})
    try {
      let q = query(collection(db, 'orders'), 
      where("nIdBranchOffice", "==", nIdBranchOffice), 
      where("sTypeService", "==", typeService),
      where("dInitService", ">", moment().format(dateFormatList[0])),
      orderBy("dInitService", "desc")
    );
      
      const unsub = onSnapshot(q, (querySnapshot) => {
        console.log("rxGetOrders")
        const orders = [];
        querySnapshot.forEach(doc => {
            orders.push({...doc.data(), nIdOrder: doc.id}) 
        })
        dispatch({type: FETCH_GET_ORDERS_SUCCESS, payload: orders })
      })
      cb && cb(unsub)
    } catch (error) {
      console.log(error, "error")
      dispatch({type: FETCH_GET_ORDERS_ERROR})
      message.error('Error del servidor.')
    }
  }
  
  export const rxUpdateOrder = (nIdOrder, order) => async dispatch => {
    dispatch({type: FETCH_UPDATE_ORDER_START})
    try {
      await updateDoc(doc(db, 'orders', nIdOrder), order);
      message.success("Pedido actualizado.")
      dispatch({type: FETCH_UPDATE_ORDER_SUCCESS})
    } catch (error) {
      dispatch({type: FETCH_UPDATE_ORDER_ERROR})
      message.error('Error del servidor.')
    }
  }

  export const rxOrderSelected = (payload) => ({type: ORDER_SELECTED, payload})

  export const rxOrderDishSelected = (payload) => ({type: ORDER_DISH_SELECTED, payload})

  export const rxShowOrderSummary = (payload) => ({type: SHOW_ORDER_SUMMARY, payload})

  export const rxOrderSummary = (payload) =>({type: ORDER_SUMMARY, payload})

  export const rxOrderSummaryTotal = (payload) =>({type: ORDER_SUMMARY_TOTAL, payload})

  export const rxClearAllOrderSummary = () =>({type: CLEAR_ALL_ORDER_SUMMARY})