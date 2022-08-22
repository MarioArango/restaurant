import { db } from '../../firebase/firebaseConfig';
import { doc, addDoc, deleteDoc, updateDoc, onSnapshot, collection, where, query, getDocs, limit } from "firebase/firestore";
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
  SHOW_FORM_USER,
  USER_SELECTED,
  USER_AUTH_SUCURSAL,
  USER_SET_TYPE_SERVICE,
  USER_SET_NUMBER_TABLE,
  USER_SHOW_TYPE_SERVICE,
  FETCH_REQUEST_WAITER_START,
  FETCH_REQUEST_WAITER_SUCCESS,
  FETCH_REQUEST_WAITER_ERROR,
  FETCH_GET_REQUEST_WAITERS_START,
  FETCH_GET_REQUEST_WAITERS_SUCCESS,
  FETCH_GET_REQUEST_WAITERS_ERROR,
  USER_SHOW_RATE,
  FETCH_SEND_RATE_START,
  FETCH_SEND_RATE_SUCCESS,
  FETCH_SEND_RATE_ERROR
} from '../types'
import moment from 'moment';

export const rxRegisterUser = (user, cb = null) => async dispatch => {
    dispatch({type: FETCH_REGISTER_USER_START})
    try {
      const docRef = await addDoc(collection(db, 'users'), user);
      if(docRef){
        dispatch({type: FETCH_REGISTER_USER_SUCCESS})
        message.success("Registrado")
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
      await updateDoc(doc(db, 'users', nIdUser), user);
      dispatch({type: FETCH_UPDATE_USER_SUCCESS})
      message.success("Actualizado.")
      cb && cb()
    } catch (error) {
    dispatch({type: FETCH_UPDATE_USER_ERROR})
      message.error('Error del servidor.')
    }
  } 
  
  export const rxGetUsers = (nIdBranchOffice) => async dispatch => {
    dispatch({type: FETCH_GET_USERS_START})
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = []
      querySnapshot.forEach(doc => {
          users.push({...doc.data(), nIdUser: doc.id}) 
      })
      dispatch({type: FETCH_GET_USERS_SUCCESS, payload: {users, nIdBranchOffice}})
    } catch (error) {
    dispatch({type: FETCH_GET_USERS_ERROR})
      message.error('Error del servidor.')
    }
  }
  
  export const rxDeleteUser = (nIdUser) => async dispatch => {
    dispatch({type: FETCH_DELETE_USER_START})
    try {
      await deleteDoc(doc(db, 'users', nIdUser))
      dispatch({type: FETCH_DELETE_USER_SUCCESS})
      message.success("Eliminado.")
    } catch (error) {
    dispatch({type: FETCH_DELETE_USER_ERROR})
      message.error('Error del servidor.')
    }
  }

  const getRols = async (nIdRol) => {
    let permissions = [];
    try {
      const querySnapshot = await getDocs(collection(db, 'rols'));
      querySnapshot.forEach(doc => {
        if(doc.id === nIdRol){
          permissions.push({...doc.data(), nIdRol: doc.id}) 
        }
      })
      localStorage.setItem("authPermissions", JSON.stringify(permissions))
      return permissions;
    } catch (error) {
    }
  }

  export const rxLoginUser = (sUsername, sPassword, cb = null) => async dispatch =>{
    dispatch({type: FETCH_LOGIN_USER_START})
    try {
      const sPasswordEncrypt = btoa(sPassword);
      const q = query(collection(db, "users"), where("sUsername", "==", sUsername), where("sPassword", "==", sPasswordEncrypt));
      const querySnapshot = await getDocs(q);
      if(querySnapshot?.docs?.length > 0){
        querySnapshot.forEach((doc) => {
          const user = doc.data();

          const sPasswordDecryp = atob(user.sPassword);
          if(user.sUsername === sUsername && sPasswordDecryp === sPassword){
            localStorage.setItem("authSucursal", JSON.stringify(user.sBranchOfficesAssigned[0]))

            let permissions = []; 
            getRols(user.nIdRol).then(data => {
              permissions = data;
              dispatch({type: FETCH_LOGIN_USER_SUCCESS, payload: {user, permissions}})
              message.success("Bienvenido")
              cb && cb(true, user)
            })
          }else {
            dispatch({type: FETCH_LOGIN_USER_ERROR})
            cb && cb(false)
          }
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

  export const rxShowFormUser = (payload) => ({type: SHOW_FORM_USER, payload});

  export const rxUserSelected = (payload) => ({type: USER_SELECTED, payload});

  export const rxSetUserAuthSucursal = (payload) => ({type: USER_AUTH_SUCURSAL, payload});

  export const rxSetTypeService = (payload) => ({type: USER_SET_TYPE_SERVICE, payload});

  export const rxSetNumberTable = (payload) => ({type: USER_SET_NUMBER_TABLE, payload});

  export const rxShowTypeService = (payload) => ({type: USER_SHOW_TYPE_SERVICE, payload});


  /**
   * ---------------
   * REQUEST WAITERS
   * ---------------
   */

  export const rxAddRequestWaiter = (requestWaiter) => async dispatch => {
    dispatch({type: FETCH_REQUEST_WAITER_START})
    try {
      const docRef = await addDoc(collection(db, 'requestWaiter'), requestWaiter);
      if(docRef){
        dispatch({type: FETCH_REQUEST_WAITER_SUCCESS})
        message.success("Enviado")
      }
    } catch (error) {
      dispatch({type: FETCH_REQUEST_WAITER_ERROR})
      message.error('Error del servidor.')
    }
  } 

  export const rxGetRequestWaiters = (nIdBranchOffice, cb = null) => async dispatch => {
    dispatch({type: FETCH_GET_REQUEST_WAITERS_START})
    try {
      const q = query(collection(db, "requestWaiter"), 
        where("nIdBranchOffice", "==", nIdBranchOffice),
        where("dCreated", "==", moment().format("DD/MM/YYYY")),
        limit(10)
      );
      const unsub = onSnapshot(q, (querySnapshot) => {
        const requestWaiters = [];
        querySnapshot.forEach(doc => {
          requestWaiters.push({...doc.data(), nIdRequestWaiter: doc.id}) 
        })
        const resultH = requestWaiters.sort((a,b) => {
          if(a.dCreatedHour < b.dCreatedHour){
            return 1
          }
          if(a.dCreatedHour > b.dCreatedHour){
            return -1
          }
          return 0
        })
        const resultM = resultH.sort((a,b) => {
          if(a.dCreatedMin < b.dCreatedMin){
            return 1
          }
          if(a.dCreatedMin > b.dCreatedMin){
            return -1
          }
          return 0
        })
        dispatch({type: FETCH_GET_REQUEST_WAITERS_SUCCESS, payload: resultM })
      })
      cb && cb(unsub)
    } catch (error) {
      dispatch({type: FETCH_GET_REQUEST_WAITERS_ERROR})
      message.error('Error del servidor.')
    }
  }

  /**
   * ----------
   * SHOW RATE
   * ----------
   */

   export const rxShowRate = (payload) => ({type: USER_SHOW_RATE, payload});
   
   export const rxSendRate = (rate, cb = null) => async dispatch => {
    dispatch({type: FETCH_SEND_RATE_START})
    try {
      const docRef = await addDoc(collection(db, 'rates'), rate);
      if(docRef){
        dispatch({type: FETCH_SEND_RATE_SUCCESS})
        message.success("Enviado")
        cb && cb()
      }
    } catch (error) {
      dispatch({type: FETCH_SEND_RATE_ERROR})
      message.error('Error del servidor.')
    }
  } 
