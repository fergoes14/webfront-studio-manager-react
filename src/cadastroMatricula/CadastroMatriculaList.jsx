
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete, init, showEvo } from './CadastroMatriculaAction'


class CadastroMatriculaList extends Component {
       
    componentWillMount() {

        this.props.getList()
        console.log('list' + this.props.list)
    }

    

    renderRows() {
        const list = this.props.list || []
        return list.map(ca => (
            <tr key={ca._id}>
                <td>{ca.plano}</td>
                <td>{ca.aluno}</td>
                <td>{ca.sala}</td>
                <td>{ca.profissional}</td>
                <td>{ca.fimPlano}</td>
                
                <td>
                    {/* <button  className='btn btn-success' onClick={() => this.props.showUpdate(ca)}>
                        <i className='fa fa-dollar '></i>
                    </button> */}
                    <button className='btn btn-danger ' onClick={() => this.props.showDelete(ca)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>

            </tr>
        ))
    }
    render() {

        
        return (
            <div className="box">
                
                <div id="example2_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Plano</th>
                                <th>Aluno</th>
                                <th>sala</th>
                                <th>Profissional</th>
                                <th>Vencimento</th>
                                <th className='tableActions'>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderRows()}
                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ list: state.cadastroMatricula.list })
const mapDispatchToProps = dispatch => bindActionCreators({ showUpdate, showDelete, getList, init, showEvo }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CadastroMatriculaList)