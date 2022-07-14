import { db } from '../firebase/firebaseConfig';
import { doc, addDoc, deleteDoc, updateDoc, onSnapshot, collection, where, query, getDocs } from "firebase/firestore";
import { message } from 'antd';
import {
  FETCH_REGISTER_USER_START,
  FETCH_REGISTER_USER_SUCCESS,
  FETCH_REGISTER_USER_ERROR,
  FETCH_UPDATE_USER_START,
  FETCH_UPDATE_USER_SUCCESS,
  FETCH_UPDATE_USER_ERROR,
  FETCH_GET_USERS_START,
  FETCH_GET_USERS_SUCCESS,
  FETCH_GET_USERS_ERROR,
  FETCH_DELETE_USER_START,
  FETCH_DELETE_USER_SUCCESS,
  FETCH_DELETE_USER_ERROR,
  FETCH_LOGIN_USER_START,
  FETCH_LOGIN_USER_SUCCESS,
  FETCH_LOGIN_USER_ERROR,
} from '../types'

export const rxRegisterUser = (user, cb = null) => async dispatch => {
    dispatch({type: FETCH_REGISTER_USER_START})
    try {
      const docRef = await addDoc(collection(db, 'users'), user);
      if(docRef){
        dispatch({type: FETCH_REGISTER_USER_SUCCESS})
        cb && cb()
      }
    } catch (error) {
    dispatch({type: FETCH_REGISTER_USER_ERROR})
      message.error('Error del servidor.')
    }
  } 
  
  export const rxUpdateUser = (nIdUser, user, cb = null) => async dispatch =>{
    dispatch({type: FETCH_UPDATE_USER_START})
    try {
      console.log(nIdUser, "nIdUser")
      console.log(user, "user")
      await updateDoc(collection(db, 'users', nIdUser), user);
      dispatch({type: FETCH_UPDATE_USER_SUCCESS})

      message.success("Usuario actualizado.")
      cb && cb()
    } catch (error) {
    dispatch({type: FETCH_UPDATE_USER_ERROR})
      console.log(error, "error")
      message.error('Error del servidor.')
    }
  } 
  
  export const rxGetUsers = (cb = null) => async dispatch => {
    dispatch({type: FETCH_GET_USERS_START})
    try {
      const querySnapshot = await getDocs(collection(db, 'users'), cb);
    dispatch({type: FETCH_GET_USERS_SUCCESS})
      cb && cb(querySnapshot)
    } catch (error) {
    dispatch({type: FETCH_GET_USERS_ERROR})
      message.error('Error del servidor.')
    }
  }
  
  export const rxDeleteUser = (nIdUser, cb = null) => async dispatch => {
    dispatch({type: FETCH_DELETE_USER_START})
    try {
      await deleteDoc(doc(db, 'users', nIdUser))
    dispatch({type: FETCH_DELETE_USER_SUCCESS})
      message.success("Eliminado.")
      cb && cb()
    } catch (error) {
    dispatch({type: FETCH_DELETE_USER_ERROR})
      message.error('Error del servidor.')
    }
  }

  export const rxLoginUser = (sUsername, sPassword, cb = null) => async dispatch =>{
    dispatch({type: FETCH_LOGIN_USER_START})
    try {
      const q = query(collection(db, "users"), where("sUsername", "==", sUsername), where("sPassword", "==", sPassword));
      const querySnapshot = await getDocs(q);
      if(querySnapshot?.docs?.length > 0){
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          if(user.sUsername === sUsername && user.sPassword === sPassword){
            cb && cb(true)
          }
          dispatch({type: FETCH_LOGIN_USER_SUCCESS})
        
        })
      }else {
        dispatch({type: FETCH_LOGIN_USER_ERROR})
        cb && cb(false)
      }
    } catch (error) {
    dispatch({type: FETCH_LOGIN_USER_ERROR})
      message.error('Error del servidor.')
    }
  }