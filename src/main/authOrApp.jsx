import '../common/template/dependencies'
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import App from './App'
import Auth from '../auth/auth'
import { validateToken, login, refreshToken } from '../auth/authActions'


class AuthOrApp extends Component {
    componentWillMount() {


        if (this.props.auth.user) {

            this.props.validateToken(this.props.auth.user.access_token)

           

        }


    }

   

    

    

    render() {

        

        const { user, validToken } = this.props.auth
        console.log('usuario user' + user)
        console.log('token valid' + validToken)
        if (user && validToken) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token
            return <App>{this.props.children}</App>
        } else if (!user && !validToken) {
            return <Auth />
        } else {
            return false
        }
    }
}
const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken, login, refreshToken },
    dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp)