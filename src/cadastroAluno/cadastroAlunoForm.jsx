import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import LabelAndInput from '../common/form/labelAndInput'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { init } from './cadastroAlunoActions'
import SelectInput from '../common/form/select'
import FileInput from '../common/form/inputFile'





class CadastroAlunoForm extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange() {
        this.props.change("studio", this.props.user.studio)
        this.props.init

    }
    render() {

        const { handleSubmit, readOnly } = this.props

        return (


            <form role='form' onSubmit={handleSubmit}>
                <div>
                    <Field placeholder='Nome' name='nome' component={LabelAndInput} label='Nome' cols='12 4' readOnly={readOnly} />
                    <Field placeholder='E-mail' name='Email' component={LabelAndInput} label='Email' cols='12 4' readOnly={readOnly} />
                    <Field mask='(99)99999-9999' placeholder='whats' name='cel' component={LabelAndInput} label='Telefone' cols='12 4' readOnly={readOnly} />

                    <Field name='status' label='Status' component={SelectInput} cols='12 6' readOnly={readOnly} />
                    <Field mask='99/99/9999' placeholder='Nascimento' name='nascimento' component={LabelAndInput} cols='12 6' label='Nascimento' readOnly={readOnly} />

                    <Field placeholder='Intuito' name='intuito' component={LabelAndInput} label='Intuito' readOnly={readOnly} />
                    <Field placeholder='Restições' name='restricoes' component={LabelAndInput} label='Restrições' readOnly={readOnly} />

                    <Field type='hidden' name='studio' component={LabelAndInput} />

                    <Field type="file" name="poster" component={FileInput} label='Upload File' />
                </div>

                <div>
                    <Field mask="99999-999" placeholder='CEP' name='cep' component={LabelAndInput} label='CEP' readOnly={readOnly} cols='6 6' />
                    <Field placeholder='Número' name='numero' type='Number' component={LabelAndInput} label='Número' readOnly={readOnly} cols='6 6' />
                    <Field placeholder='Bairro' name='bairro' component={LabelAndInput} label='Bairro' readOnly={readOnly} cols='6 6' />
                    <Field placeholder='Rua' name='rua' component={LabelAndInput} label='Rua' readOnly={readOnly} cols='6 6' />
                </div>
                


                <div className='box-footer'>
                    <button type='submit' className={`btn ${this.props.submitClass}`} onClick={this.handleChange}>
                        {this.props.submitLabel}
                    </button>

                    <button type='button' className='btn btn-danger' onClick={this.props.init}>Cancelar</button>
                </div>

            </form>

        )
    }
}


CadastroAlunoForm = reduxForm({ form: 'cadastroAlunoForm', destroyOnUnmount: false })(CadastroAlunoForm)
const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CadastroAlunoForm)