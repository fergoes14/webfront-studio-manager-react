import React from 'react'
import Navbar from './navbar'

export default props => {
    return (
        <header className='main-header '>
            <a href="/#/" className='logo colorBar '>
                <span className='logo-mini'>Studio</span>
                <span className='logo-lg'><b>Studio</b> Manager</span>
            </a>
            <nav className='navbar navbar-static-top colorBar '>
                <a href className='sidebar-toggle' data-toggle='offcanvas'></a>
                <Navbar/>
            </nav>
        </header>

        
    )


}

