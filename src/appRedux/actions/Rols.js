import { db } from '../../firebase/firebaseConfig';
import { doc, addDoc, deleteDoc, updateDoc, onSnapshot, collection, where, query, getDocs, limit } from "firebase/firestore";
import { message } from 'antd';
import {
  FETCH_ADD_ROL_START,
  FETCH_ADD_ROL_SUCCESS,
  FETCH_ADD_ROL_ERROR,
  FETCH_UPDATE_ROL_START,
  FETCH_UPDATE_ROL_SUCCESS,
  FETCH_UPDATE_ROL_ERROR,
  FETCH_DEL_ROL_START,
  FETCH_DEL_ROL_SUCCESS,
  FETCH_DEL_ROL_ERROR,
  FETCH_GET_ROLS_START,
  FETCH_GET_ROLS_SUCCESS,
  FETCH_GET_ROLS_ERROR,
  SHOW_FORM_ROL,
  ROL_SELECTED
} from '../types';

export const rxRegisterRol = (rol, cb = null) => async dispatch => {
    dispatch({type: FETCH_ADD_ROL_START})
    try {
      const docRef = await addDoc(collection(db, 'rols'), rol);
      if(docRef){
        dispatch({type: FETCH_ADD_ROL_SUCCESS})
        message.success("Registrado")
        cb && cb()
      }
    } catch (error) {
    dispatch({type: FETCH_ADD_ROL_ERROR})
      message.error('Error del servidor.')
    }
  } 
  
  export const rxUpdateRol = (nIdRol, rol, cb = null) => async dispatch =>{
    dispatch({type: FETCH_UPDATE_ROL_START})
    try {
      await updateDoc(doc(db, 'rols', nIdRol), rol);
      dispatch({type: FETCH_UPDATE_ROL_SUCCESS})
      message.success("Actualizado.")
      cb && cb()
    } catch (error) {
    dispatch({type: FETCH_UPDATE_ROL_ERROR})
      message.error('Error del servidor.')
    }
  } 
  
  export const rxGetRols = (cb = null) => async dispatch => {
    dispatch({type: FETCH_GET_ROLS_START})
    try {
      const querySnapshot = await getDocs(collection(db, 'rols'), cb);
      const rols = []
      querySnapshot.forEach(doc => {
          rols.push({...doc.data(), nIdRol: doc.id}) 
      })
      dispatch({type: FETCH_GET_ROLS_SUCCESS, payload: rols})
    } catch (error) {
    dispatch({type: FETCH_GET_ROLS_ERROR})
      message.error('Error del servidor.')
    }
  }
  
  export const rxDeleteRol = (nIdRol) => async dispatch => {
    dispatch({type: FETCH_DEL_ROL_START})
    try {
      await deleteDoc(doc(db, 'rols', nIdRol))
      dispatch({type: FETCH_DEL_ROL_SUCCESS})
      message.success("Eliminado.")
    } catch (error) {
    dispatch({type: FETCH_DEL_ROL_ERROR})
      message.error('Error del servidor.')
    }
  }

  export const rxShowFormRol = (payload) => ({type: SHOW_FORM_ROL, payload});

  export const rxRolSelected = (payload) => ({type: ROL_SELECTED, payload});