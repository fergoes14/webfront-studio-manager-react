import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, submitSearch, showUpdate, showDelete, changeName, init } from './cadastroProfActions'
import SearchInput from '../common/form/inputSearch'

class CadastroProfissionalList extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }


    componentWillMount() {

        this.props.getList()

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
                <td>{ca.name}</td>
                <td>{ca.status}</td>
                <td>{ca.celular || ca.telefone || "N/D"}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(ca)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger ' onClick={() => this.props.showDelete(ca)}>
                        <i className='fa fa-trash-o'></i>
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

const mapStateToProps = state => ({ list: state.cadastroProf.list })
const mapDispatchToProps = dispatch => bindActionCreators({ submitSearch, showUpdate, showDelete, changeName, getList, init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CadastroProfissionalList)