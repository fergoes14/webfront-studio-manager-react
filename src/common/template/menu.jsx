import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'
export default props =>{
    return(
        <ul className='sidebar-menu tree'>
            <MenuItem path='/'label='Dashboard' icon='fa fa-dashboard'/>
            <MenuTree label='Cadastros' icon='fa fa-edit'>
                <MenuItem path='/cadastroAlunos' label='Cadastro Aluno' icon='fa fa-user'/>
            </MenuTree>
        </ul>
    )
}

