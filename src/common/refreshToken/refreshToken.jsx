import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  refreshToken } from '../../auth/authActions'



class RefreshToken extends Component {
  
    componentWillMount(){
        setInterval(() => {
           this.props.refreshToken(this.props.auth.user.access_token, this.props.auth.user.refreshToken)
            //axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.auth.user.access_token
          }, 900000);
      }

       render() {
      
        return (
            <div>
                
            </div>
        )
    }
}



const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({refreshToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(RefreshToken)
