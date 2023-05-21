import React from 'react';
import firebase from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';

const Logout = () => {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // User signed out successfully
        console.log('User signed out');
      })
      .catch((error) => {
        // Handle sign out errors
        console.error('Sign out error:', error);
      });
  };

  return (
    <>
      <span className='btn' onClick={handleLogout}>Logout</span>
    </>
  );
};

export default Logout;
