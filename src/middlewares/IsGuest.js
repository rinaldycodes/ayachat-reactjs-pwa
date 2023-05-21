import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { redirect, useNavigate  } from 'react-router-dom'
import { getUserInfo } from '../api/ChatApi';
import { storeDataLogin } from '../helper/SessionLogin';

const IsGuest = (props) => {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        nav("/beranda")

      } else {

      }
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  return props.children

};

export default IsGuest;
