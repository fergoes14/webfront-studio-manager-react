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
import InfoBox from '../common/widget/infoBox'
import moment from 'moment'


const BASE_URL = 'https://backend-studio-manager.herokuapp.com/alunos/summary'
const URL = 'https://backend-studio-manager.herokuapp.com/matriculas'
class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: [],
            matriculasMongo: []
        }
    }


    // componentWillMount(){
    //     setInterval(() => {
    //        this.props.refreshToken(this.props.auth.user.access_token, this.props.auth.user.refreshToken)
    //         //axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.props.auth.user.access_token
    //       }, 5000);
    //   }

    async componentDidMount() {
        const response = await axios.get(BASE_URL)
        const matriculas = await axios.get(URL)

        this.setState({ status: response.data })
        this.setState({ matriculasMongo: matriculas.data })

        console.log(JSON.stringify(this.state.matriculasMongo.length))

        const teste = new Date()

        console.log('teste' + new Date(teste.getMonth()))
    }

    matriculasList() {
        const today = new Date()
        const filterMatriculas = this.state.matriculasMongo
            .filter((ma) => ma.duracao < today.getMonth())

        return filterMatriculas.map((ma) => (
            <tr key={ma._id}>
                <td>{ma.aluno}</td>
                <td>{ma.plano}</td>
                <td>{ma.fimPlano}</td>
            </tr>
        ))
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
                        {/* <Content >
                            <Row>
                                <InfoBox cols='12 4' value='title' text='text' color='success' />
                                <InfoBox cols='12 4' value='Planos vencidos' text='text' color='danger'>
                                    <table className='table'>
                                        <thead>
                                            <th>Aluno</th>
                                            <th>plano</th>
                                            <th>vencimento</th>
                                        </thead>
                                        <tbody>
                                            {this.matriculasList()}
                                        </tbody>
                                    </table>
                                </InfoBox>
                                <InfoBox cols='12 4' value='title' text='text' color='warning' />
                            </Row>
                        </Content> */}
                    </div>
                ))}
            </div>
        )
    }
}



const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ refreshToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
