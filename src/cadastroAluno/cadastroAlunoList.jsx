import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, submitSearch, showUpdate, showDelete, changeName, init,showEvo } from './cadastroAlunoActions'
import SearchInput from '../common/form/inputSearch'

class CadastroAlunoList extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }


    componentWillMount() {

        this.props.getList()
        console.log('list'+ this.props.list)
    }

    keyHandler(e) {
        const { submitSearch, init } = this.props
        if (e.key === 'Enter') {
            submitSearch()
        } else if (e.key === 'Escape') {
            init()
        }
    }


    renderRows() {
        const list = this.props.list || []
        return list.map(ca => (
            <tr key={ca._id}>
                <td>{ca.nome}</td>
                <td>{ca.status}</td>
                <td>{ca.cel}</td>
                <td>{ca.cpf}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(ca)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger ' onClick={() => this.props.showDelete(ca)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                    <button onClick={() => this.props.showEvo(ca)} className='btn btn-success'>
                        <i className='fa fa-line-chart'></i>
                    </button>
                </td>

            </tr>
        ))
    }
    render() {

        const { changeName } = this.props
        return (
            <div className="box">
                <div className="box-header">
                    <SearchInput onKeyUp={this.keyHandler} cols='6 6' onChange={changeName} placeholder='Busca' />
                    <div className='input-group-btn'>
                        <button onClick={this.props.submitSearch} className='btn btn-info'>
                            <i className='fa fa-search'></i>
                        </button>

                        <button onClick={this.props.init} className='btn btn-danger'>
                            <i className='fa fa-trash'></i>
                        </button>



                    </div>

                </div>
                <div id="example2_wrapper" className="dataTables_wrapper form-inline dt-bootstrap">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Status</th>
                                <th>WhatsApp</th>
                                <th>CPF</th>
                                <th className='tableActions'>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderRows()}
                        </tbody>

                    </table>
                </div>
                {/* <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                    <ul className="pagination">
                        <li className="paginate_button previous disabled" id="example2_previous">
                            <a href="#" aria-controls="example2" data-dt-idx="0" tabindex="0">Previous</a>
                        </li>
                        <li className="paginate_button active"><a href="#" aria-controls="example2" data-dt-idx="1" tabindex="0">1</a>
                        </li>
                        <li className="paginate_button ">
                            <a href="#" aria-controls="example2" data-dt-idx="2" tabindex="0">2</a>
                        </li>
                        <li className="paginate_button ">
                            <a href="#" aria-controls="example2" data-dt-idx="3" tabindex="0">3</a>
                        </li>
                        <li className="paginate_button ">
                            <a href="#" aria-controls="example2" data-dt-idx="4" tabindex="0">4</a>
                        </li>
                        <li className="paginate_button ">
                            <a href="#" aria-controls="example2" data-dt-idx="5" tabindex="0">5</a>
                        </li>
                        <li className="paginate_button ">
                            <a href="#" aria-controls="example2" data-dt-idx="6" tabindex="0">6</a>
                        </li>
                        <li className="paginate_button next" id="example2_next">
                            <a href="#" aria-controls="example2" data-dt-idx="7" tabindex="0">Next</a>
                        </li>
                    </ul>
                </div> */}


            </div>
        )
    }
}

const mapStateToProps = state => ({ list: state.cadastroAluno.list })
const mapDispatchToProps = dispatch => bindActionCreators({ submitSearch, showUpdate, showDelete, changeName, getList, init,showEvo }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CadastroAlunoList)