import React, { useEffect, useState } from 'react'
import { app_name } from '../configs/Constants'
import { getDataLogin } from '../helper/SessionLogin';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import { handleLogout } from '../api/UserApi';

const SidebarMenu = () => {
    const nav = useNavigate();
    const [alias_name, set_alias_name] = useState('');
    
    useEffect( () => {
        set_alias_name( getDataLogin('alias_name'))
    }, [])

    const handle = () => {   
        nav('/add-group');
    }
  return (
    <div>
        <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel">{alias_name}</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="offcanvas-body">
                <ul className="list-group pointer">
                    <li className="list-group-item" onClick={ () => nav('/add-group') }>Create Group</li>
                    <li className="list-group-item text-secondary" onClick={ () => handleLogout() }>Logout</li>
                </ul>
            </div>
        </div>

    </div>
  )
}

export default SidebarMenu