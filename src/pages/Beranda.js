import React, { useEffect, useState } from 'react'
import Logout from '../components/Logout'
import Navbar from '../components/Navbar'
import Navtab from '../components/Navtab'
import MyButtonMenu from '../components/MyButtonMenu'
import ObrolanRekomendasi from './ObrolanRekomendasi'
import TabBerandaComponent from '../components/TabBerandaComponent'
import LoadingScreen from './LoadingScreen'

const Beranda = () => {
  const [active_screen, set_active_screen] = useState(1); 
  const [loading_screen, set_loading_screen] = useState(true);

  const handleActiveScreen = (data) => {
    set_active_screen(data);
  }


  useEffect( () => {
    setTimeout(() => {
      set_loading_screen(false);
    }, 1000);
  }, [])

  
  return (
    <>
        <Navbar
          headerRight={
            <MyButtonMenu />
          }
        />
        { 
          loading_screen ?
          <LoadingScreen  loading_text={'Loading'}/>
          :
          <TabBerandaComponent />
        }
    </>
  )
}

export default Beranda