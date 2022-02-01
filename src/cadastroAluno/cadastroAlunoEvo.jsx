import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { init } from './cadastroAlunoActions'
import { getList } from './evoAlunoaction'
import Content from '../common/template/content'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { reduxForm, Field } from 'redux-form'






class CadastroAlunoEvo extends Component {
    constructor(props) {
        super(props)


    }
    componentWillMount() {
        this.props.getList()
    }


    renderRows() {
        const list = this.props.Photolist || []
        return list.map(ph => (
            <div className='card '>
                <img className='imgCard' src={ph.photo} alt="" />
            </div>
        ))
    }

    render() {



        return (
            <Content>
                <div className='container-card'>

                    {this.renderRows()}

                    {this.props.Photolist.length < 5 &&
                        <div className='card'>
                            <div className='icon'>
                                <AiOutlinePlusCircle
                                    size={200}
                                    color="#696773"
                                />
                            </div>
                        </div>
                    }



                   
                </div>
                <div className='box-footer'>
                    <button type='button' className='btn btn-danger' onClick={this.props.init}>Cancelar</button>
                </div>

            </Content>

        )
    }
}


CadastroAlunoEvo = reduxForm({ form: 'cadastroAlunoForm', destroyOnUnmount: false })(CadastroAlunoEvo)
const mapStateToProps = state => ({ Photolist: state.evoAluno.Photolist })
const mapDispatchToProps = dispatch => bindActionCreators({ init, getList }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CadastroAlunoEvo)