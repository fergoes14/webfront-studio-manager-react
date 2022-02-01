import React from 'react'


import { Switch, Route, Redirect } from 'react-router'


import Auth from '../auth/auth'
import Dashboard from '../dashboard/dashboard'
import CadastroAluno from '../cadastroAluno/CadastroAluno'
import CadastroProfissional from '../cadastroProfissional/cadastroProfissional'
import Agenda from '../agenda/agenda'


export default props => {
    return (
        <div className='content-wrapper'>
            <div className='content-body'>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                
                
                <Route path='/cadastroAlunos' component={CadastroAluno} />
                <Route path='/agenda' component={Agenda} />
                <Route path='/cadastroPofissionais' component={CadastroProfissional}/>
                <Route patch='/login'component={Auth} />
                <Redirect from='*' to='/' />
            </Switch>
            </div>
        </div>
    )
}