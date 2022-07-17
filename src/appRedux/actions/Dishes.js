import { db } from '../../firebase/firebaseConfig';
import { doc, addDoc, deleteDoc, updateDoc, onSnapshot, collection, where, query, getDocs } from "firebase/firestore";
import { message } from 'antd';

import {
  FETCH_ADD_DISHES_START,
  FETCH_ADD_DISHES_SUCCESS,
  FETCH_ADD_DISHES_ERROR,
  FETCH_UPDATE_DISH_START,
  FETCH_UPDATE_DISH_SUCCESS,
  FETCH_UPDATE_DISH_ERROR,
  FETCH_GET_DISHES_START,
  FETCH_GET_DISHES_SUCCESS,
  FETCH_GET_DISHES_ERROR,
  DISH_SELECTED,
  SHOW_FORM_DISHES,
  FETCH_DELETE_DISH_START,
  FETCH_DELETE_DISH_SUCCESS,
  FETCH_DELETE_DISH_ERROR,
} from '../types'


export const rxAddDishes = (dish, cb = null) => async dispatch => {
    dispatch({type: FETCH_ADD_DISHES_START})
    try {
      const docRef = await addDoc(collection(db, 'dishes'), dish)
      if(docRef){
        dispatch({type: FETCH_ADD_DISHES_SUCCESS})
        message.success("Plato registrado.")
        cb && cb()
      }
    } catch (error) {
      dispatch({type: FETCH_ADD_DISHES_ERROR})
      message.error('Error del servidor.')
    }
}

export const rxUpdateDish = (nIdDish, dish, cb = null) => async dispatch => {
  dispatch({type: FETCH_UPDATE_DISH_START})
    try {
      //collection por doc
      await updateDoc(collection(db, 'dishes', nIdDish), dish);
      dispatch({type: FETCH_UPDATE_DISH_SUCCESS})
      message.success("Plato actualizado.")
      cb && cb()
    } catch (error) {
    dispatch({type: FETCH_UPDATE_DISH_ERROR})
      message.error('Error del servidor.')
    }
}


export const rxGetDishes = (authSucursal) => async dispatch => {
  dispatch({type: FETCH_GET_DISHES_START})
  try {
    const q = query(collection(db, "dishes"), where("nIdBranchOffice", "==", authSucursal));
    const querySnapshot = await getDocs(q);
    const dishes = [];
    querySnapshot.forEach(doc => {
      dishes.push({...doc.data(), nIdDish: doc.id}) 
    })
    dispatch({type: FETCH_GET_DISHES_SUCCESS, payload: dishes})
  } catch (error) {
    dispatch({type: FETCH_GET_DISHES_ERROR})
    message.error('Error del servidor.')
  }
}

export const rxDishSelected = (payload) => ({type: DISH_SELECTED, payload})

export const rxShowFormDishes = (payload) => ({type: SHOW_FORM_DISHES, payload})

export const rxDeleteDish = (nIdDish) => async dispatch => {
  dispatch({type: FETCH_DELETE_DISH_START})
  try {
    await deleteDoc(doc(db, 'dishes', nIdDish))
    message.success("Eliminado.")
    dispatch({type: FETCH_DELETE_DISH_SUCCESS})
  } catch (error) {
    dispatch({type: FETCH_DELETE_DISH_ERROR})
    message.error('Error del servidor.')
  }
}
