import React from 'react'
import { app_name } from '../configs/Constants'
import { useNavigate } from 'react-router-dom'

const Navtab = ({ handleActiveScreen }) => {
  const nav = useNavigate();

  return (
    <nav className="navbar bg-light">
        <div className="container-fluid">
            <span className="navbar-brand mb-0 h1 fs-6 pointer" onClick={ () => handleActiveScreen(1) }>Obrolan Rekomendasi</span>
            <span className="navbar-brand mb-0 h1 fs-6 pointer" onClick={ () => handleActiveScreen(2)}>Obrolan Saya</span>
            <span className="navbar-brand mb-0 h1 fs-6" onClick={ () => handleActiveScreen(3)}>Kontak</span>
        </div>
    </nav>
  )
}

export default Navtab