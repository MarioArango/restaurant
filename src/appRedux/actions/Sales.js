import { db } from '../../firebase/firebaseConfig';
import { doc, addDoc, deleteDoc, updateDoc, onSnapshot, collection, where, query, getDocs } from "firebase/firestore";
import { message } from 'antd';

import {
    FETCH_GET_SALES_START,
    FETCH_GET_SALES_SUCCESS,
    FETCH_GET_SALES_ERROR,
} from '../types'

export const rxGetSales = (cb = null) => async dispatch => {
    dispatch({type: FETCH_GET_SALES_START})
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'), cb);
      const sales = []
      querySnapshot.forEach(doc => {
        sales.push({...doc.data(), nIdUser: doc.id}) 
      })
      dispatch({type: FETCH_GET_SALES_SUCCESS, payload: sales})
    } catch (error) {
    dispatch({type: FETCH_GET_SALES_ERROR})
      message.error('Error del servidor.')
    }
  }
