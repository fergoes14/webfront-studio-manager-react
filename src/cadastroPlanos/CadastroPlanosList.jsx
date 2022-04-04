
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete, init, showEvo } from './CadastroPlanosAction'


class CadastroPlanosList extends Component {
       
    componentWillMount() {

        this.props.getList()
        console.log('list' + this.props.list)
    }

    

    renderRows() {
        const list = this.props.list || []
        return list.map(cp => (
            <tr key={cp._id}>
                <td>{cp.name}</td>
                <td>R${cp.valor}</td>
                <td>{cp.vezesSemana}</td>
                <td>{cp.duracao}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(cp)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger ' onClick={() => this.props.showDelete(cp)}>
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
                                <th>Nome</th>
                                <th>Valor</th>
                                <th>Vezes na semana</th>
                                <th>Duração</th>
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

const mapStateToProps = state => ({ list: state.cadastroPlanos.list })
const mapDispatchToProps = dispatch => bindActionCreators({ showUpdate, showDelete, getList, init, showEvo }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CadastroPlanosList)