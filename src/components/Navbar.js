import React from 'react'
import { app_name } from '../configs/Constants'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ headerBack, headerTitle,  headerRight}) => {
    const nav = useNavigate();
  return (
    <>
        <nav className="navbar bg-light sticky-top" style={{ backgroundColor: 'coral'}}>
            <div className="container-fluid">
                {
                    headerBack &&
                    <span className="navbar-brand mb-0 h1 pointer" onClick={ () => nav(-1) }>
                        <i className='fa fa-arrow-left'></i>
                    </span>
                }
                {
                    headerTitle ?
                    <span className="navbar-brand mb-0 h1">{headerTitle}</span>
                    :
                    <span className="navbar-brand mb-0 h1">{app_name}</span>
                }
                {/* <span className="navbar-brand mb-0 h1"><i className='fa fa-bars'></i></span> */}
                <span className="navbar-brand mb-0 h1"></span>
                {
                    headerRight &&
                    <span className="navbar-brand mb-0 h1">
                        { headerRight }
                    </span>
                }
            </div>
        </nav>
    </>
  )
}

export default Navbar