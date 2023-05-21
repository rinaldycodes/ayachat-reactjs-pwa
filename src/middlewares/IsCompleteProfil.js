import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { redirect, useNavigate  } from 'react-router-dom'
const IsCompleteProfil = (props) => {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        // User is logged in
        setUser(user);
        console.log('user', user)

      } else {
        // User is logged out
        setUser(null);
        nav("/login")
      }
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  return props.children

};

export default IsCompleteProfil;
