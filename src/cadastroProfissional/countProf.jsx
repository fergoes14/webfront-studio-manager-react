import React, { Component } from 'react'
import { connect } from 'react-redux'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'
import axios from 'axios'



// const BASE_URL = 'https://backend-studio-react.herokuapp.com/profissionais/summary'
const BASE_URL = 'https://backend-studio-react.herokuapp.com/profissionais/summary'
class CountProf extends Component {

    state = {
        status: []
    }



    async componentDidMount() {
        const response = await axios.get(BASE_URL)
        this.setState({ status: response.data })
    }

    render() {
        const { status } = this.state
        return (
            <div>
                {status.map(status => (
                    <div className='container'>
                        
                        <Content>
                            <Row>
                                <ValueBox cols='12 4' color='green' icon='fa fa-check-square-o'
                                    value={status.ativos} text='Profissionais Ativos' />
                                <ValueBox cols='12 4' color='red' icon='fa fa-times'
                                    value={status.inativos} text='Profissionais Inativos' />
                                <ValueBox cols='12 4' color='yellow' icon='fa fa-user-o'
                                    value={status.ativos + status.inativos} text='Total de Profissionais' />
                            </Row>
                        </Content>
                    </div>
                ))}

            </div>
        )
    }
}



const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps)(CountProf)
