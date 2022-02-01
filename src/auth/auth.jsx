import './auth.css'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, signup, changelogin } from './authActions'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'

import Input from '../common/form/inputAuth'
import Messages from '../common/msg/messages'




class Auth extends Component {


    constructor(props) {
        super(props)
        this.state = { loginMode: true }

        this.changeMode = this.changeMode.bind(this)

    }

    // password match validation
    changeMode() {
        this.setState({ loginMode: !this.state.loginMode })
    }

    componentWillUpdate() {
        if (this.props.auth.changeLogin == true) {
            this.changeMode()
        }
        console.log('change login' + this.props.auth.changeLogin)
    }


    onSubmit(values) {
        const { login, signup } = this.props
        this.state.loginMode ? login(values) : signup(values)


    }



    render() {

        const { loginMode } = this.state
        const { handleSubmit } = this.props
        return (
            <div className="login-box">
                <div className="login-logo"><b> Studio</b> Manager</div>
                <div className="login-box-body">
                    <p className="login-box-msg">Bem vindo!</p>
                    <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                        <Field component={Input} type="input" name="name"
                            placeholder="Nome" icon='user' hide={loginMode} />
                        <Field component={Input} type="email" name="email"
                            placeholder="E-mail" icon='envelope' />
                        <Field component={Input} type="password" name="password"
                            placeholder="Senha" icon='lock' />
                        <Field component={Input} type="password" name="confirm_password"
                            placeholder="Confirmar Senha" icon='lock' hide={loginMode} />
                        <Row>
                            <Grid cols="4">
                                <div>
                                    {loginMode ?
                                        <button type="submit"
                                            className="btn btn-primary btn-block btn-flat"  >
                                            Entrar
                                        </button>
                                        :
                                        <button type="submit"
                                            className="btn btn-primary btn-block btn-flat" >
                                            Registrar
                                        </button>}
                                </div>


                            </Grid>
                        </Row>
                    </form>
                    <br />
                    <a onClick={() => this.changeMode()}>
                        {loginMode ? 'Novo usuário? Registrar aqui!' :
                            'Já é cadastrado? Entrar aqui!'}
                    </a>
                </div>
                <Messages />
            </div>

        )
    }
}
Auth = reduxForm({ form: 'authForm' })(Auth)
const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Auth)
