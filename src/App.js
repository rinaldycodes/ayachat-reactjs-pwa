import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyRoutes from './MyRoutes';

function App() {
  return (
    <div className="Appx container-fluid">
      <div className='row justify-content-center'>
        <div className='col-lg-5 card' style={{
          height: '100vh',
          padding: 0,
          overflowY:'auto'
        }}>
          <MyRoutes />      
        </div>
      </div>
    </div>
  );
}

export default App;
