import React, { useEffect } from 'react'


import { HashRouter } from 'react-router-dom'
import Header from '../common/template/header'
import Sidebar from '../common/template/sidebar'
import Footer from '../common/template/footer'
import Routes from './routes'
import Messages from '../common/msg/messages'
import RefreshToken from '../common/refreshToken/refreshToken'




export default props => {



  return (
    <HashRouter>
      <div className='wrapper'>
        <RefreshToken/>
        <Header/>
        <Sidebar/>
        <Routes />
        <Footer/>
        <Messages/>
      </div>
    </HashRouter>

  )
}