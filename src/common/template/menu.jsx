import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props =>{
    return(
        <ul className='sidebar-menu tree sidebar-toggle'>
            <MenuItem path='/'label='Dashboard' icon='fa fa-dashboard'/>
            <MenuItem path='/agenda'label='Agenda' icon='fa fa-calendar'/>
            <MenuItem path='/matricula'label='Matriculas' icon='fa fa-users'/>
            <MenuItem path='/Finanças'label='Finanças' icon='fa fa-dollar'/>
            
            
            <MenuTree label='Cadastros' icon='fa fa-edit'>
                <MenuItem path='/cadastroAlunos' label='Aluno' icon='fa fa-user'/>
                <MenuItem path='/cadastroPofissionais' label='Profissional' icon=' fa fa-user-md'/>
                <MenuItem path='/cadastroSalas' label='Salas' icon='fa fa-map-signs'/>
                <MenuItem path='/cadastroPlanos' label='Planos' icon='fa  fa-archive'/>
            </MenuTree>
        </ul>
    )
}

