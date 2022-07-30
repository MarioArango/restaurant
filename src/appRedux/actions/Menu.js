import { db } from '../../firebase/firebaseConfig';
import { doc, addDoc, deleteDoc, updateDoc, onSnapshot, collection, where, query, getDocs } from "firebase/firestore";
import { message } from 'antd';

import {
    FETCH_GET_DISHES_MENU_START,
    FETCH_GET_DISHES_MENU_SUCCESS,
    FETCH_GET_DISHES_MENU_ERROR,
    FILTER_DISHES_MENU,
    INIT_SERVICE_MENU,
    FETCH_INIT_SERVICE,
    FETCH_CLEAR_INIT_SERVICE
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

export const rxFilterDishesMenu = (payload) => ({type: FILTER_DISHES_MENU, payload})

export const rxShowInitService = (payload) => ({type: INIT_SERVICE_MENU, payload})

export const rxInitService = (payload) => ({type: FETCH_INIT_SERVICE, payload})

export const rxClearAllInitService = () => ({type: FETCH_CLEAR_INIT_SERVICE})