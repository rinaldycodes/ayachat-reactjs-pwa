import React from 'react'
import secureLocalStorage from 'react-secure-storage'

const prefix = 'Chat_'

export const storeDataChat = (key,value) => {
  try {
    secureLocalStorage.setItem(prefix+key,value);
    
  } catch (error) {
    console.log('error set session', error)
  }
}

export const getDataChat = (key) => {
  try {
    const res = secureLocalStorage.getItem(prefix+key);
    return res;
  } catch (error) {
    console.log('error set session', error)
  }
}

export const removeDataChat = (key) => {
  try {
    const res = secureLocalStorage.removeItem(prefix+key);
    return res;
  } catch (error) {
    console.log('error set session', error)
  }
}

