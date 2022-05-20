import React, { Component } from 'react'
import { connect } from 'react-redux'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'
import axios from 'axios'



// const BASE_URL = 'https://backend-studio-react.herokuapp.com/profissionais/summary'
const BASE_URL = 'https://backend-studio-react.herokuapp.com/pagamentos/summary'
class CountBilling extends Component {

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
                                <ValueBox cols='12 4' color='green' icon='fa fa-bank'
                                    value={status.creditos} text='Total de Créditos' />
                                <ValueBox cols='12 4' color='red' icon='fa fa-credit-card'
                                    value={status.debitos} text='Total de Débitos' />
                                <ValueBox cols='12 4' color='blue' icon='fa fa-money'
                                    value={status.creditos - status.debitos} text='Valor Consolidado' />
                            </Row>
                        </Content>
                    </div>
                ))}

            </div>
        )
    }
}



const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps)(CountBilling)
