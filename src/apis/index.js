import { db } from '../firebase/firebaseConfig';
import { auth } from '../firebase/firebaseConfig';
import { addDoc, onSnapshot, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { message } from 'antd';

/**
 * -------
 * DISHES
 * -------
 */
export const rxAddDishes = async (dish, cb = null) => {
    try {
      const docRef = await addDoc(collection(db, 'dishes'), dish)
      if(docRef){
        message.success("Plato registrado.")
        cb && cb()
      }
    } catch (error) {
      message.error('Error del servidor.')
    }
}

export const rxGetDishes = async (cb = null) => {
  try {
    onSnapshot(collection(db, 'dishes'), cb)
  } catch (error) {
    message.error('Error del servidor.')
  }
}

/**
 * ---------------
 * GENERATE ORDER
 * ---------------
 */
 export const rxGenerateOrder = async (order, cb = null) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), order)
    if(docRef){
      message.success("Orden generada.")
      cb && cb()
    }
  } catch (error) {
    message.error('Error del servidor.')
  }
}

/**
 * --------------
 * REGISTER USER
 * --------------
 */
 export const rxRegisterUser = async (email, password, cb = null) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    cb && cb()
  } catch (error) {
    console.log(error.message)
    if(error.message === "Firebase: Error (auth/email-already-in-use)."){
      message.warning('El correo ya se encuentra registrado.')
    }else if(error.message === "Firebase: Password should be at least 6 characters (auth/weak-password)."){
      message.warning('La contraseña debe ser mayor a 6 digitos.')
    } else {
      message.error('Error del servidor.')
    }
  }
} 

export const rxLoginUser = async (email, password, cb = null) => {
  try {

    cb && cb()
  } catch (error) {
    message.error('Error del servidor.')
  }
}
