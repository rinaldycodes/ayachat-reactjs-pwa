import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat'
import Register from './pages/Register'
import Login from './pages/Login'
import Beranda from './pages/Beranda'
import LoginStatus from './middlewares/LoginStatus'
import ObrolanRekomendasi from './pages/ObrolanRekomendasi'
import AddGroup from './pages/AddGroup'
import IsGuest from './middlewares/IsGuest'
import Profil from './pages/Profil'
import ProfilEdit from './pages/ProfilEdit'

const MyRoutes = () => {
    useEffect( () => {

    }, [])
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={ <IsGuest> <Login /> </IsGuest> } />
            <Route path='/login' element={ <IsGuest> <Login /> </IsGuest> } />
            <Route path='/register' element={ <IsGuest> <Register /> </IsGuest> } />
            <Route path='/chat/:chat_id' element={ <LoginStatus> <Chat /> </LoginStatus> } />
            <Route path='/beranda' element={ <LoginStatus> <Beranda /> </LoginStatus> } />
            <Route path='/profil' element={ <LoginStatus> <Profil /> </LoginStatus> } />
            <Route path='/profil-edit' element={ <LoginStatus> <ProfilEdit /> </LoginStatus> } />
            <Route path='/obrolan-rekomendasi' element={ <LoginStatus> <ObrolanRekomendasi /> </LoginStatus> } />
            <Route path='/add-group' element={ <LoginStatus> <AddGroup /> </LoginStatus> } />
        </Routes>
    </BrowserRouter>
  )
}

export default MyRoutes