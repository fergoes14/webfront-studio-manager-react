import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSummary } from './dashboardActions'
import Content from '../common/template/content'
import ContentHeader from '../common/template/contentHeader'
import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'
import axios from 'axios'
import { applyMiddleware } from 'redux'
import { refreshToken } from '../auth/authActions'


const BASE_URL = 'https://backend-studio-manager.herokuapp.com/alunos/summary'
class Dashboard extends Component {

    state = {
        status: []
    }

    // componentWillMount(){
    //     setInterval(() => {
    //        this.props.refreshToken(this.props.auth.user.access_token, this.props.auth.user.refreshToken)
    //         //axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.auth.user.access_token
    //       }, 5000);
    //   }

    async componentDidMount() {
        const response = await axios.get(BASE_URL)
        this.setState({ status: response.data })
    }

    render() {
        const { status } = this.state
        return (
            <div>
                {status.map(status => (
                    <div>
                        <ContentHeader title='Dashboard' small='Versão 1.0.0' />
                        <Content>
                            <Row>
                                <ValueBox cols='12 4' color='green' icon='fa fa-check-square-o'
                                    value={status.ativos} text='Alunos Ativos' />
                                <ValueBox cols='12 4' color='red' icon='fa fa-times'
                                    value={status.inativos} text='Alunos Inativos' />
                                <ValueBox cols='12 4' color='yellow' icon='fa fa-user-o'
                                    value={status.ativos + status.inativos} text='Total de Alunos' />
                            </Row>
                        </Content>
                    </div>
                ))}

            
        
            </div>
        )
    }
}



const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ refreshToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
