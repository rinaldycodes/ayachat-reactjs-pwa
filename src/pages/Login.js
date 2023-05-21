import React, { useState } from 'react';
import firebase from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingScreen from './LoadingScreen';
import { storeDataLogin } from '../helper/SessionLogin';
import { getUserInfo } from '../api/UserApi';

const Login = () => {
  const nav = useNavigate();
  const [loading_screen, set_loading_screen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth();
    set_loading_screen(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User logged in successfully
        const user = userCredential.user;
        // console.log('User logged in:', user);

        getUserInfo(user.uid).then( (res) => {

          storeDataLogin('uid', user.uid )
          storeDataLogin('email', res.email )
          storeDataLogin('alias_name', res.alias_name )
          storeDataLogin('age', res.age )
          storeDataLogin('cid', res.character )
        });

        set_loading_screen(false)
        nav('/beranda');
      })
      .catch((error) => {
        set_loading_screen(false)
        console.error('Login error:', error);
      });
  };

  if ( loading_screen ) {
    return (
      <LoadingScreen loading_text={'Trying to login...'}/>
    )
  }

  return (
    <div>
      <Navbar 
        headerTitle={'Login'}
      />
      <div className='container-fluid'>
        <div className='form-group mb-3'>
          <label>Email</label>
          <input
            className='form-control'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-group mb-3'>
          <label>Password</label>
          <input
            className='form-control'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='form-group mb-3'>
          <button className='btn btn-primary' onClick={handleLogin}>Login</button>
        </div>
        <div className='form-group mb-3'>
          <Link to={'/register'}>Belum punya akun? Buat akun disini</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
