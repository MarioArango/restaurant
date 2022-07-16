import { db } from '../../firebase/firebaseConfig';
import { doc, addDoc, deleteDoc, updateDoc, onSnapshot, collection, where, query, getDocs } from "firebase/firestore";
import { message } from 'antd';

import {
    FETCH_REGISTER_BRANCHOFFICE_START,
    FETCH_REGISTER_BRANCHOFFICE_SUCCESS,
    FETCH_REGISTER_BRANCHOFFICE_ERROR,
    FETCH_GET_BRANCHOFFICES_START,
    FETCH_GET_BRANCHOFFICES_SUCCESS,
    FETCH_GET_BRANCHOFFICES_ERROR,
    FETCH_DELETE_BRANCHOFFICE_START,
    FETCH_DELETE_BRANCHOFFICE_SUCCESS,
    FETCH_DELETE_BRANCHOFFICE_ERROR,
    SHOW_FORM_BRANCHOFFICE,
    BRANCHOFFICE_SELECTED,
    FETCH_UPDATE_BRANCHOFFICE_START,
    FETCH_UPDATE_BRANCHOFFICE_SUCCESS,
    FETCH_UPDATE_BRANCHOFFICE_ERROR
} from '../types'

export const rxRegisterBranchOffice = (branchOffice, cb = null) => async dispatch => {
    dispatch({type: FETCH_REGISTER_BRANCHOFFICE_START})
    try {
      const docRef = await addDoc(collection(db, 'branchOffices'), branchOffice);
      if(docRef){
        dispatch({type: FETCH_REGISTER_BRANCHOFFICE_SUCCESS})
        message.success("Registrado")
        cb && cb()
      }
    } catch (error) {
    dispatch({type: FETCH_REGISTER_BRANCHOFFICE_ERROR})
      message.error('Error del servidor.')
    }
  } 

export const rxGetBranchOffices = (cb = null) => async dispatch => {
    dispatch({type: FETCH_GET_BRANCHOFFICES_START})
    try {
      const querySnapshot = await getDocs(collection(db, 'branchOffices'), cb);
      const branchOffices = []
      querySnapshot.forEach(doc => {
        branchOffices.push({...doc.data(), nIdUser: doc.id}) 
      })
      dispatch({type: FETCH_GET_BRANCHOFFICES_SUCCESS, payload: branchOffices})
    } catch (error) {
    dispatch({type: FETCH_GET_BRANCHOFFICES_ERROR})
      message.error('Error del servidor.')
    }
  }

  export const rxDeleteBranchOffice = (nIdUser) => async dispatch => {
    dispatch({type: FETCH_DELETE_BRANCHOFFICE_START})
    try {
      await deleteDoc(doc(db, 'branchOffices', nIdUser))
      dispatch({type: FETCH_DELETE_BRANCHOFFICE_SUCCESS})
      message.success("Eliminado.")
    } catch (error) {
    dispatch({type: FETCH_DELETE_BRANCHOFFICE_ERROR})
      message.error('Error del servidor.')
    }
  }
  
  export const rxShowFormBranchOff = (payload) => ({type: SHOW_FORM_BRANCHOFFICE, payload});

  export const rxBranchOffSelected = (payload) => ({type: BRANCHOFFICE_SELECTED, payload});

  export const rxUpdateBranchOffice = (nIdBranchOffice, branchOffice, cb = null) => async dispatch =>{
    dispatch({type: FETCH_UPDATE_BRANCHOFFICE_START})
    try {
      await updateDoc(collection(db, 'branchOffices', nIdBranchOffice), branchOffice);
      dispatch({type: FETCH_UPDATE_BRANCHOFFICE_SUCCESS})
      message.success("Actualizado.")
      cb && cb()
    } catch (error) {
    dispatch({type: FETCH_UPDATE_BRANCHOFFICE_ERROR})
      message.error('Error del servidor.')
    }
  } 