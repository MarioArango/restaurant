import db from '../firebase/firebaseConfig';
import { addDoc, onSnapshot, collection } from "firebase/firestore";
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