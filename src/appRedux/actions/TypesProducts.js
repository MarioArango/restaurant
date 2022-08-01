import { db } from '../../firebase/firebaseConfig';
import { doc, addDoc, deleteDoc, updateDoc, collection, where, query, getDocs } from "firebase/firestore";
import { message } from 'antd';

import {
    FETCH_REGISTER_TYPE_PRODUCT_START,
    FETCH_REGISTER_TYPE_PRODUCT_SUCCESS,
    FETCH_REGISTER_TYPE_PRODUCT_ERROR,
    FETCH_GET_TYPES_PRODUCTS_START,
    FETCH_GET_TYPES_PRODUCTS_SUCCESS,
    FETCH_GET_TYPES_PRODUCTS_ERROR,
    FETCH_DELETE_TYPE_PRODUCT_START,
    FETCH_DELETE_TYPE_PRODUCT_SUCCESS,
    FETCH_DELETE_TYPE_PRODUCT_ERROR,
    SHOW_FORM_TYPE_PRODUCT,
    TYPE_PRODUCT_SELECTED,
    FETCH_UPDATE_TYPE_PRODUCT_START,
    FETCH_UPDATE_TYPE_PRODUCT_SUCCESS,
    FETCH_UPDATE_TYPE_PRODUCT_ERROR
} from '../types'

export const rxRegisterTypeProduct = (typeProduct, cb = null) => async dispatch => {
    dispatch({type: FETCH_REGISTER_TYPE_PRODUCT_START})
    try {
      const docRef = await addDoc(collection(db, 'typesProducts'), typeProduct);
      if(docRef){
        dispatch({type: FETCH_REGISTER_TYPE_PRODUCT_SUCCESS})
        message.success("Registrado")
        cb && cb()
      }
    } catch (error) {
    dispatch({type: FETCH_REGISTER_TYPE_PRODUCT_ERROR})
      message.error('Error del servidor.')
    }
  } 

export const rxGetTypesProducts = (nIdBranchOffice) => async dispatch => {
    dispatch({type: FETCH_GET_TYPES_PRODUCTS_START})
    try {
      const q = query(collection(db, "typesProducts"), where("nIdBranchOffice", "==", nIdBranchOffice));
      const querySnapshot = await getDocs(q);
      const branchOffices = []
      querySnapshot.forEach(doc => {
        branchOffices.push({...doc.data(), nIdTypeProduct: doc.id}) 
      })
      dispatch({type: FETCH_GET_TYPES_PRODUCTS_SUCCESS, payload: branchOffices})
    } catch (error) {
    dispatch({type: FETCH_GET_TYPES_PRODUCTS_ERROR})
      message.error('Error del servidor.')
    }
  }

  export const rxDeleteTypeProduct = (nIdTypeProduct) => async dispatch => {
    dispatch({type: FETCH_DELETE_TYPE_PRODUCT_START})
    try {
      await deleteDoc(doc(db, 'typesProducts', nIdTypeProduct))
      dispatch({type: FETCH_DELETE_TYPE_PRODUCT_SUCCESS})
      message.success("Eliminado.")
    } catch (error) {
    dispatch({type: FETCH_DELETE_TYPE_PRODUCT_ERROR})
      message.error('Error del servidor.')
    }
  }
  
  export const rxShowFormTypeProduct = (payload) => ({type: SHOW_FORM_TYPE_PRODUCT, payload});

  export const rxTypeProductSelected = (payload) => ({type: TYPE_PRODUCT_SELECTED, payload});

  export const rxUpdateTypeProduct = (nIdTypeProduct, typeProduct, cb = null) => async dispatch =>{
    dispatch({type: FETCH_UPDATE_TYPE_PRODUCT_START})
    try {
      await updateDoc(doc(db, 'typesProducts', nIdTypeProduct), typeProduct);
      dispatch({type: FETCH_UPDATE_TYPE_PRODUCT_SUCCESS})
      message.success("Actualizado.")
      cb && cb()
    } catch (error) {
    dispatch({type: FETCH_UPDATE_TYPE_PRODUCT_ERROR})
      message.error('Error del servidor.')
    }
  } 