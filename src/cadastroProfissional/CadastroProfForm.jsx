import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import LabelAndInput from '../common/form/labelAndInput'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { init } from '././cadastroProfActions'
import SelectInput from '../common/form/select'
import { CirclePicker } from 'react-color';
import Grid from '../common/layout/grid'




class CadastroProfForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            background: '#fff',
            id: ''
        };

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.setState({ id: String(Math.random()), })
        console.log('id:' + this.state.id)
    }
    handleChange() {

        this.props.change("studio", this.props.user.studio)
        this.props.change("borderColor", this.state.background)

        if (this.state.background != '#fff') {
            this.props.change("bgColor", this.state.background)
        }
        this.props.change("id", this.state.id)
        this.props.init

    }
  

    handleChangeComplete = (color, event) => {
        this.setState({ background: color.hex });
        console.log(this.state.background)
    };


    render() {

        const { handleSubmit, readOnly } = this.props
        const { background } = this.state
        return (


            <form role='form' onSubmit={handleSubmit}>
                <div>
                    <Field placeholder='Nome' name='name' component={LabelAndInput} label='Nome' cols='12 4' readOnly={readOnly} />
                    <Field placeholder='E-mail' name='email' component={LabelAndInput} label='Email' cols='12 4' readOnly={readOnly} />
                    <Field mask='(99)99999-9999' placeholder='Celular' name='celular' component={LabelAndInput} label='Telefone' cols='12 4' readOnly={readOnly} />
                    <Field mask='(99)9999-9999' placeholder='Telefone' name='telefone' component={LabelAndInput} label='Telefone' cols='12 4' readOnly={readOnly} />

                    <Field name='status' label='Status' component={SelectInput} cols='12 4' readOnly={readOnly}>
                        <option value=""></option>
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                    </Field>
                    <Field mask='99/99/9999' placeholder='Nascimento' name='nascimento' component={LabelAndInput} cols='12 4' label='Nascimento' readOnly={readOnly} />

                    <Field type='hidden' name='studio' component={LabelAndInput} />
                    <Field type='hidden' name='id' component={LabelAndInput} />
                    <Field type='hidden' name='borderColor' component={LabelAndInput} />
                    <Field type='hidden' name='bgColor' component={LabelAndInput} />
                </div>
                <div>
                    <Grid cols='12 4' >
                        <label>Cor Da Agenda</label>
                        <CirclePicker
                            colors={[
                                '#FFF323', '#FF0000', '#FFBA08', '#3F88C5', '#D82148', '#C45AB3',
                                '#2C6E49', '#631A86', '#0A0908', '#49111C', '#F4A698', '#FF8427',
                                '#D3FFF3', '#9649CB', '#C1FF9B', '#d55d92', '#adff02', '#3a86ff'
                            ]}
                            onChangeComplete={this.handleChangeComplete}
                        />
                    </Grid>
                    <Grid cols='12 4'>
                        <button style={{ backgroundColor: background, width: '50px', height: '50px', borderRadius: '50%' }} className='btn btn-default' type='button'></button>
                    </Grid>
                </div>


                <div>
                    <Field mask="99999-999" placeholder='CEP' name='cep' component={LabelAndInput} label='CEP' readOnly={readOnly} cols='12 4' />
                    <Field placeholder='Número' name='numero' type='Number' component={LabelAndInput} label='Número' readOnly={readOnly} cols='12 4' />
                    <Field placeholder='Bairro' name='bairro' component={LabelAndInput} label='Bairro' readOnly={readOnly} cols='12 4' />
                    <Field placeholder='Rua' name='rua' component={LabelAndInput} label='Rua' readOnly={readOnly} cols='6 6' />
                    <Field placeholder='Complemento' name='complemento' component={LabelAndInput} label='Complemento' readOnly={readOnly} cols='6 6' />
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


CadastroProfForm = reduxForm({ form: 'cadastroProfForm', destroyOnUnmount: false })(CadastroProfForm)
const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CadastroProfForm)