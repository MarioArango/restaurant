import { db } from '../firebase/firebaseConfig';
import { doc, addDoc, deleteDoc, updateDoc, onSnapshot, collection, where, query, getDocs } from "firebase/firestore";
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
  DISH_SELECTED,
  SHOW_ORDER_SUMMARY,
  ORDER_SUMMARY
} from '../types'

export const rxGenerateOrder = (order) => async dispatch => {
  dispatch({type: FETCH_GENERATE_ORDER_START})
  try {
      const docRef = await addDoc(collection(db, 'orders'), order)
      if(docRef){
        message.success("Orden generada.")
        dispatch({type: FETCH_GENERATE_ORDER_SUCCESS})
      }
    } catch (error) {
      dispatch({type: FETCH_GENERATE_ORDER_ERROR})
      message.error('Error del servidor.')
    }
  }
  
  export const rxGetOrders = (cb = null) => async dispatch => {
    dispatch({type: FETCH_GET_ORDERS_START})
    try {
      onSnapshot(collection(db, 'orders'), (querySnapshot) => {
        const orders = [];
        querySnapshot.forEach(doc => {
            orders.push({...doc.data(), nIdOrder: doc.id}) 
        })
        dispatch({type: FETCH_GET_ORDERS_SUCCESS, payload: orders })
      })
      
    } catch (error) {
      dispatch({type: FETCH_GET_ORDERS_ERROR})
      message.error('Error del servidor.')
    }
  }
  
  export const rxUpdateOrder = (nIdOrder, order) => async dispatch => {
    dispatch({type: FETCH_UPDATE_ORDER_START})
    try {
      await updateDoc(collection(db, 'orders', nIdOrder), order);
      message.success("Pedido actualizado.")
      dispatch({type: FETCH_UPDATE_ORDER_SUCCESS})
    } catch (error) {
      dispatch({type: FETCH_UPDATE_ORDER_ERROR})
      message.error('Error del servidor.')
    }
  }

  export const rxOrderSelected = (payload) => ({type: ORDER_SELECTED, payload})

  export const rxDishSelected = (payload) => ({type: DISH_SELECTED, payload})

  export const rxShowOrderSummary = (payload) => ({type: SHOW_ORDER_SUMMARY, payload})

  export const rxOrderSummary = (payload) => ({type: ORDER_SUMMARY, payload})