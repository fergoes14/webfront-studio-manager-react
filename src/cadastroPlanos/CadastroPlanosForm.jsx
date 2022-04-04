import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import LabelAndInput from '../common/form/labelAndInput'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { init } from './CadastroPlanosAction'
import SelectInput from '../common/form/select'
import "react-datepicker/dist/react-datepicker.css";


class CadastroPlanosForm extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)

    }

    handleChange() {

        //this.props.change('id', this.state.id)
        //this.props.change("borderColor", this.state.background)
        this.props.change("studio", this.props.user.studio)
        this.props.init


    }

    render() {

        const { handleSubmit, readOnly } = this.props
        return (

            <div>
                <form role='form' onSubmit={handleSubmit}>
                    <div>
                        <Field placeholder='Nome' name='name' onChange={this.handleTitle} component={LabelAndInput} label='Nome' cols='12' readOnly={readOnly} />
                        {/* <Field placeholder='Vezes na Semana' mask='9X' name='vezesSemana' onChange={this.handleTitle} component={LabelAndInput} label='Vezes na Semana' cols='12 4' readOnly={readOnly} /> */}
                        <Field placeholder='Duração (Meses)' type='Number' name='duracao' onChange={this.handleTitle} component={LabelAndInput} label='Duração' cols='12 4' readOnly={readOnly} />
                        <Field placeholder='Valor' name='valor' type='Number' onChange={this.handleTitle} component={LabelAndInput} label='Valor' cols='12 4' readOnly={readOnly} />
                        <Field name="vezesSemana" component={SelectInput} label='Vezes na semana' cols='12 4'>
                            <option value="">Vezes na semana</option>
                            <option value={1}>1x</option>
                            <option value={2}>2x</option>
                            <option value={3}>3x</option>
                            <option value={4}>4x</option>
                            <option value={5}>5x</option>
                            <option value={6}>6x</option>
                            <option value={7}>7x</option>
                        </Field>



                        <Field type='hidden' name='studio' component={LabelAndInput} />
                    </div>



                    <div className='box-footer'>
                        <button
                            type='submit'
                            className={`btn ${this.props.submitClass}`}
                            onClick={this.handleChange}

                        >
                            {this.props.submitLabel}
                        </button>

                        <button type='button' className='btn btn-danger' onClick={this.props.init}>Cancelar</button>
                    </div>

                </form>
            </div>
        )
    }
}
CadastroPlanosForm = reduxForm({ form: 'cadastroPlanosForm', destroyOnUnmount: false })(CadastroPlanosForm)
const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CadastroPlanosForm)