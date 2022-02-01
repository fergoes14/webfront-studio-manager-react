import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props =>{
    return(
        <ul className='sidebar-menu tree sidebar-toggle'>
            <MenuItem path='/'label='Dashboard' icon='fa fa-dashboard'/>
            <MenuItem path='/agenda'label='Agenda' icon='fa fa-calendar'/>
            
            
            <MenuTree label='Cadastros' icon='fa fa-edit'>
                <MenuItem path='/cadastroAlunos' label='Cadastro Aluno' icon='fa fa-user'/>
                <MenuItem path='/cadastroPofissionais' label='Cadastro Profissional' icon='fa fa-user'/>
                <MenuItem path='/' label='Cadastro Planos' icon='fa fa-user'/>
            </MenuTree>
        </ul>
    )
}

