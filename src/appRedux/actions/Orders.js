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
  FETCH_UPDATE_ORDER_ERROR
} from '../types'

export const rxGenerateOrder = (order, cb = null) => async dispatch => {
  dispatch({type: FETCH_GENERATE_ORDER_START})
  try {
      const docRef = await addDoc(collection(db, 'orders'), order)
      if(docRef){
        dispatch({type: FETCH_GENERATE_ORDER_SUCCESS})
        message.success("Orden generada.")
        cb && cb()
      }
    } catch (error) {
      dispatch({type: FETCH_GENERATE_ORDER_ERROR})
      message.error('Error del servidor.')
    }
  }
  
  export const rxGetOrders = (cb = null) => async dispatch => {
    dispatch({type: FETCH_GET_ORDERS_START})
    try {
      onSnapshot(collection(db, 'orders'), cb)
      dispatch({type: FETCH_GET_ORDERS_SUCCESS})
    } catch (error) {
      dispatch({type: FETCH_GET_ORDERS_ERROR})
      message.error('Error del servidor.')
    }
  }
  
  export const rxUpdateOrder = (nIdOrder, order, cb = null) => async dispatch => {
    dispatch({type: FETCH_UPDATE_ORDER_START})
    try {
      await updateDoc(collection(db, 'orders', nIdOrder), order);
      dispatch({type: FETCH_UPDATE_ORDER_SUCCESS})

      message.success("Pedido actualizado.")
      cb && cb()
    } catch (error) {
      dispatch({type: FETCH_UPDATE_ORDER_ERROR})
      message.error('Error del servidor.')
    }
  }