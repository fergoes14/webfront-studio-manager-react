import React from 'react'


import { Switch, Route, Redirect } from 'react-router'


import Auth from '../auth/auth'
import Dashboard from '../dashboard/dashboard'
import CadastroAluno from '../cadastroAluno/CadastroAluno'
import CadastroProfissional from '../cadastroProfissional/cadastroProfissional'
import Agenda from '../agenda/agenda'
import CadastroSalas from '../cadastroSalas/CadastroSalas'
import CadastroPlanos from '../cadastroPlanos/CadastroPlanos'
import CadastroMatricula from '../cadastroMatricula/CadastroMatricula'
import billingCycles from '../billingCicles/billingCycle'


export default props => {
    return (
        <div className='content-wrapper'>
            <div className='content-body'>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                
                
                <Route path='/cadastroAlunos' component={CadastroAluno} />
                <Route path='/agenda' component={Agenda}/>
                <Route path='/matricula' component={CadastroMatricula}/>
                <Route path='/finanças' component={billingCycles}/>
                <Route path='/cadastroPofissionais' component={CadastroProfissional}/>
                <Route path='/cadastroSalas' component={CadastroSalas}/>
                <Route path='/cadastroPlanos' component={CadastroPlanos}/>
                <Route patch='/login'component={Auth}/>

                <Redirect from='*' to='/' />
            </Switch>
            </div>
        </div>
    )
}