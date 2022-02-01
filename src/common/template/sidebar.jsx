import React from 'react'
import Menu from './menu'

export default props => {
    return (
        <aside className='main-sidebar'>
            <div className='slimScrollDiv'>
                <section className='sidebar'>
                    <Menu />
                </section>
                <div className='slimScrollBar'></div>
                <div className='slimScrollRail'></div>
            </div>

        </aside>
    )

}