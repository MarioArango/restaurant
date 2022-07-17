import { db } from '../../firebase/firebaseConfig';
import { doc, addDoc, deleteDoc, updateDoc, onSnapshot, collection, where, query, getDocs } from "firebase/firestore";
import { message } from 'antd';

import {
    FETCH_GET_SALES_START,
    FETCH_GET_SALES_SUCCESS,
    FETCH_GET_SALES_ERROR,
} from '../types'

export const rxGetSales = (authSucursal, cb = null) => async dispatch => {
    dispatch({type: FETCH_GET_SALES_START})
    try {
      const q = query(collection(db, "orders"), where("nIdBranchOffice", "==", authSucursal));
      const querySnapshot = await getDocs(q);
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
