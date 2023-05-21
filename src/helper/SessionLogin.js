import React from 'react'
import secureLocalStorage from 'react-secure-storage'

const prefix = 'login_'

export const storeDataLogin = (key,value) => {
  try {
    secureLocalStorage.setItem(prefix+key,value);
    
  } catch (error) {
    console.log('error set session', error)
  }
}

export const getDataLogin = (key) => {
  try {
    const res = secureLocalStorage.getItem(prefix+key);
    return res;
  } catch (error) {
    console.log('error set session', error)
  }
}

export const removeDataLogin = (key) => {
  try {
    const res = secureLocalStorage.removeItem(prefix+key);
    return res;
  } catch (error) {
    console.log('error set session', error)
  }
}

