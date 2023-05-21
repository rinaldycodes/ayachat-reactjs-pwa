import React from 'react'
import { app_name } from '../configs/Constants'
import SidebarMenu from './SidebarMenu'

const MyButtonMenu = () => {
    
  return (
    <>
        <div type="button" className='pointer ' data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <i className='fa fa-bars'></i>
        </div>
        <SidebarMenu />
    </>
  )
}

export default MyButtonMenu