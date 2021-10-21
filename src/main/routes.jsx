import React from 'react'

import { Switch, Route, Redirect } from 'react-router'


import Auth from '../auth/auth'
import Dashboard from '../dashboard/dashboard'
import CadastroAluno from '../cadastroAluno/CadastroAluno'



export default props => {
    return (
        <div className='content-wrapper'>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/cadastroAlunos' component={CadastroAluno} />
                <Route patch='/login'component={Auth} />
                <Redirect from='*' to='/' />
            </Switch>
        </div>
    )
}