import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './billingCyclesAction'
import LabelAndInput from '../common/form/labelAndInput'
import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component {
    constructor(props) {
        super(props)
       
        this.handleChange = this.handleChange.bind(this)

    }
    // calculateSummary() {
    //     const sum = (t, v) => t + v
    //     return {
    //         sumOfCredits: this.props.creditos.map(c => +c.value || 0).reduce(sum),
    //         sumOfDebts: this.props.debitos.map(d => +d.value || 0).reduce(sum)
    //     }
    // }

    handleChange() {
        this.props.change("studio", this.props.user.studio)
        this.props.init

    }

    render() {
        const { handleSubmit, readOnly, credito, debito } = this.props
        // const { sumOfCredits, sumOfDebts } = this.calculateSummary()
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 6' placeholder='Informe o nome' />

                    <Field name='description' component={LabelAndInput} readOnly={readOnly}
                        label='Descrição' cols='12 6' placeholder='Informe a descrição' />
                    {/* <Summary credit={sumOfCredits} debt={sumOfDebts} /> */}

                    <ItemList cols='12 6' list={credito} readOnly={readOnly}
                        field='credito' legend='Créditos' showStatus={true} />

                    <ItemList cols='12 6' list={debito} readOnly={readOnly}
                        field='debito' legend='Débitos' showStatus={true} />

                    <Field type='hidden' name='studio' component={LabelAndInput} />

                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn ${this.props.submitClass}`} onClick={this.handleChange}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-danger'
                        onClick={this.props.init}>Cancelar</button>
                         <button type='button' className='btn btn-danger'
                        onClick={this.handleChange}>Cancelar</button>
                </div>
            </form>
        )
    }
}


BillingCycleForm = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false })(BillingCycleForm)
const selector = formValueSelector('billingCycleForm')

const mapStateToProps = state => ({
    credito: selector(state, 'credito'),
    debito: selector(state, 'debito'),
    user: state.auth.user
})
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)