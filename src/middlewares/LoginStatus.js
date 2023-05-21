import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {  useNavigate  } from 'react-router-dom'
import { storeDataLogin } from '../helper/SessionLogin';
import {  getUserInfo } from '../api/UserApi';

const LoginStatus = (props) => {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setUser(user);
        getUserInfo(user.uid).then( (res) => {

          storeDataLogin('uid', user.uid )
          storeDataLogin('email', res.email )
          storeDataLogin('alias_name', res.alias_name )
          storeDataLogin('age', res.age )
          storeDataLogin('cid', res.character )
        });
      } else {
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

export default LoginStatus;
