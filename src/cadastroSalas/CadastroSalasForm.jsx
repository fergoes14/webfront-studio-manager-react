import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import LabelAndInput from '../common/form/labelAndInput'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { init } from './CadastroSalasAction'

import "react-datepicker/dist/react-datepicker.css";
import Grid from '../common/layout/grid'
import { CirclePicker } from 'react-color'

class CadastroSalasForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            background: '#fff',
            id: ''
        }
        this.handleChange = this.handleChange.bind(this)

    }

    componentDidMount() {
        this.setState({ id: String(Math.random()) })

    }

    handleChange() {

        this.props.change('id', this.state.id)
        
        if (this.state.background != '#fff') {
            this.props.change("borderColor", this.state.background)
        }
        
        this.props.change("studio", this.props.user.studio)
        this.props.init
        this.componentDidMount()

    }

    handleChangeComplete = (color, event) => {
        this.setState({ background: color.hex });
        console.log(this.state.background)
    };


    render() {

        const { handleSubmit, readOnly } = this.props
        const { background } = this.state
        return (

            <div>
                <form role='form' onSubmit={handleSubmit}>
                    <div>
                        <Field placeholder='Nome' name='name' onChange={this.handleTitle} component={LabelAndInput} label='Nome' cols='12' readOnly={readOnly} />

                        <Field type='hidden' name='studio' component={LabelAndInput} />
                        <Field type='hidden' name='id' component={LabelAndInput} />
                        <Field type='hidden' name='borderColor' component={LabelAndInput} />
                    </div>

                    <div>
                        <Grid cols='12 4' >
                            <label>Cor Da Agenda</label>
                            <CirclePicker
                                colors={[
                                    '#EABFCB', '#C191A1', '#A4508B', '#5F0A87', '#660000', '#FF9000',
                                    '#40F99B', '#C5DECD', '#EF2917', '#C6C013', '#2D31FA', '#ED5EDD',
                                    '#ccff33', '#d4a276', '#643047', '#00b4d8', '#adff02', '#3a86ff'
                                ]}
                                onChangeComplete={this.handleChangeComplete}
                            />
                        </Grid>
                        <Grid cols='12 4'>

                            <button style={{ backgroundColor: background, width: '50px', height: '50px', borderRadius: '50%' }} className='btn btn-default' type='button'></button>
                        </Grid>
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
CadastroSalasForm = reduxForm({ form: 'cadastroSalasForm', destroyOnUnmount: false })(CadastroSalasForm)
const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CadastroSalasForm)