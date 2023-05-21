import React, { useState } from 'react';
import firebase from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import Navbar from '../components/Navbar';
import { saveRegister } from '../api/ChatApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const nav = useNavigate();

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alias_name, set_alias_name] = useState('');
  const [age, set_age] = useState('');
  const [gender, set_gender] = useState('');

  const validateEmail = (emailx) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(regex.test(emailx));
  };

  // const handleSignUp = () => {
  //   const auth = getAuth();
  //   createUserWithEmailAndPassword(auth,email, password)
  //     .then((userCredential) => {
  //       // User signed up successfully
  //       const user = userCredential.user;
  //       // saveRegister()
  //       console.log('User signed up:', user);
  //       alert("test")
  //     })
  //     .catch((error) => {
  //       // Handle sign up errors
  //       console.error('Sign up error:', error);
      
  //     });
  // };

  const handleSignUp = () => {
    const auth = getAuth();

    // Check if email already exists
    fetchSignInMethodsForEmail(auth, email)
    .then((signInMethods) => {
      if (signInMethods.length > 0) {
        // Email already exists
        console.log('Email already exists:', email);
        alert('Email already exists: '+email, email)
      } else {
        // Email does not exist, proceed with sign up
        createUserWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
          // User signed up successfully
          const user = userCredential.user;
          saveRegister(user.uid, email, alias_name, age, gender)
          alert("Berhasil membuat akun");
          // console.log('User signed up:', user);
          nav('/login')
        })
        .catch((error) => {
          // Handle sign up errors
          console.error('Sign up error:', error);
        
        });
      }
    })
    .catch((error) => {
      // Handle the error or display a message to the user
      console.error('Email existence check error:', error);
      // setError('Error checking email existence');
    });
  }

  return (
    <>
      <Navbar headerBack={true} headerTitle="Register" />
      <div className='container-fluid'>
        <div className='form-group mb-3'>
          <label>Email</label>
          <input
            className='form-control'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value)
                validateEmail(e.target.value)
              }
            }
          />
          {!isValidEmail && <p className='text-danger'>Please enter a valid email address.</p>}
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
          <label>Nama panggilan kamu</label>
          <input
            className='form-control'
            type="text"
            placeholder="Contoh: Jendral Kegelapan, Tokyo, Slow"
            value={alias_name}
            onChange={(e) => set_alias_name(e.target.value)}
          />
        </div>
        <div className='form-group mb-3'>
            <label>Jenis Kelamin </label>
            <select
                className='form-control'
                onChange={ (e) => {
                  set_gender(e.currentTarget.value)
                }}
            >
                <option value={gender}>-- Pilih --</option>
                <option value='pria'>Pria</option>
                <option value='wanita'>Wanita</option>
            </select>
        </div>
        <div className='form-group mb-3'>
                    <label>Umur kamu  <b>{age}</b></label>
                    <select
                        className='form-control'
                        onChange={ (e) => {
                          set_age(e.currentTarget.value)
                        }}
                    >
                        <option value={age}>-- Pilih --</option>
                        <option value='18'>18</option>
                        <option value='19'>19</option>
                        <option value='20'>20</option>
                        <option value='21'>21</option>
                        <option value='23'>23</option>
                        <option value='24'>24</option>
                        <option value='25'>25</option>
                        <option value='26'>26</option>
                        <option value='27'>27</option>
                        <option value='28'>28</option>
                        <option value='29'>29</option>
                        <option value='30'>30</option>
                        <option value='31'>31</option>
                        <option value='31'>31</option>
                    </select>
        </div>

        <div className='form-group mb-3'>
          <button className='btn btn-primary' onClick={handleSignUp}>Sign Up</button>

        </div>
      </div>
    </>
  );
};

export default Register;
