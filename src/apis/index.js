import { db } from '../firebase/firebaseConfig';
import { auth } from '../firebase/firebaseConfig';
import { doc, addDoc, getDoc, deleteDoc, updateDoc, onSnapshot, collection } from "firebase/firestore";
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

export const rxUpdateDish = async (nIdDish, dish, cb = null) => {
    try {
      await updateDoc(collection(db, 'dishes', nIdDish), dish);
      message.success("Plato actualizado.")
      cb && cb()
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

export const rxDeleteDish = async (nIdDish, cb = null) => {
  try {
    await deleteDoc(doc(db, 'dishes', nIdDish))
    message.success("Eliminado.")
    cb && cb()
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

export const rxGetOrders = async (cb = null) => {
  try {
    onSnapshot(collection(db, 'orders'), cb)
  } catch (error) {
    message.error('Error del servidor.')
  }
}

export const rxUpdateOrder = async (nIdOrder, order, cb = null) => {
  try {
    await updateDoc(collection(db, 'orders', nIdOrder), order);
    message.success("Pedido actualizado.")
    cb && cb()
  } catch (error) {
    message.error('Error del servidor.')
  }
}

/**
 * --------------
 * REGISTER USER
 * --------------
 */
 export const rxRegisterUser = async (user, cb = null) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), user);
    if(docRef){
      cb && cb()
    }
  } catch (error) {
    message.error('Error del servidor.')
  }
} 

export const rxUpdateUser = async (nIdUser, user, cb = null) => {
  try {
    console.log(nIdUser, "nIdUser")
    console.log(user, "user")
    await updateDoc(collection(db, 'users', nIdUser), user);
    message.success("Usuario actualizado.")
    cb && cb()
  } catch (error) {
    console.log(error, "error")
    message.error('Error del servidor.')
  }
} 

export const rxGetUsers = async (cb = null) => {
  try {
    onSnapshot(collection(db, 'users'), cb)
  } catch (error) {
    message.error('Error del servidor.')
  }
}

export const rxDeleteUser = async (nIdUser, cb = null) => {
  try {
    await deleteDoc(doc(db, 'users', nIdUser))
    message.success("Eliminado.")
    cb && cb()
  } catch (error) {
    message.error('Error del servidor.')
  }
}

/**
 * -----------
 * LOGIN USER
 * -----------
 */
export const rxLoginUser = async (email, password, cb = null) => {
  try {
    const docSnap = await getDoc(doc(db, "users"))
    if (docSnap.exists()) {
      cb && cb(docSnap.data())
    } else {
      message.error('Credenciales incorrectas.')
    }
  } catch (error) {
    message.error('Error del servidor.')
  }
}
