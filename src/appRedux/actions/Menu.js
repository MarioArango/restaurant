import { db } from '../../firebase/firebaseConfig';
import { doc, addDoc, deleteDoc, updateDoc, onSnapshot, collection, where, query, getDocs } from "firebase/firestore";
import { message } from 'antd';

import {
    FETCH_GET_DISHES_MENU_START,
    FETCH_GET_DISHES_MENU_SUCCESS,
    FETCH_GET_DISHES_MENU_ERROR
} from '../types'

export const rxGetDishesMenu = (nIdBranchOffice, typeService) => async dispatch => {
    dispatch({type: FETCH_GET_DISHES_MENU_START})
    try {
      const q = query(collection(db, "dishes"), where("nIdBranchOffice", "==", nIdBranchOffice), where("sTypeService", "==", typeService));
      const querySnapshot = await getDocs(q);
      const dishes = [];
      querySnapshot.forEach(doc => {
        dishes.push({...doc.data(), nIdDish: doc.id}) 
      })
      dispatch({type: FETCH_GET_DISHES_MENU_SUCCESS, payload: dishes})
    } catch (error) {
      dispatch({type: FETCH_GET_DISHES_MENU_ERROR})
      message.error('Error del servidor.')
    }
  }