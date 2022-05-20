import React, { Component } from 'react'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../auth/authActions'
import Grid from '../layout/grid'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
const FormData = require('form-data');
const fs = require('fs');

const userKey = '_studio_manager_user'


class Navbar extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            showModal: false,
            files: '',
            file: null,
            img: ''
        }

        
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        // this.changeUserID = this.changeUserID.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    componentDidMount() {
        this.setState({ img: JSON.parse(localStorage.getItem('img')) })
        console.log('img:' + this.state.img)
    }

    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('img', JSON.stringify(response.data))
                this.setState({ img: JSON.parse(localStorage.getItem('img')) })
            })
        this.handleOpenModal(false)
        console.log(this.state.file)
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] })
        this.setState({
            files: URL.createObjectURL(e.target.files[0])
        })

    }

    fileUpload(file) {
        const url = 'https://backend-studio-react.herokuapp.com/users';
        const formData = new FormData();
        formData.append('photos', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.put(`${url}/${this.props.user.userId}`, formData, config)
            .then(
                toastr.success('sucesso', 'Foto de perfil trocada com sucesso.'),

            )
    }

    handleChange(event) {
        this.setState({
            files: URL.createObjectURL(event.target.files[0])
        })
    }



    handleOpenModal(event) {
        this.setState({ showModal: event });


    }

   

    changeOpen() {
        this.setState({ open: !this.state.open })
    }


    render() {
        const { name, email, photos } = this.props.user
        const { changeName } = this.props
        return (
            <div className="navbar-custom-menu ">
                
                <ul className="nav navbar-nav " >
                    <li onMouseLeave={() => this.changeOpen()}
                        className={` dropdown user user-menu ${this.state.open ? 'open' :
                            ''}`}>
                        <a href="javascript:;" onClick={() => this.changeOpen()}
                            aria-expanded={this.state.open ? 'true' : 'false'}
                            className="dropdown-toggle"
                            data-toggle="dropdown">

                            {this.state.img ? <img src={this.state.img}
                                className="user-image" alt="User Image" />
                                :
                                <img src={photos}
                                    className="user-image" alt="User Image" />}

                            <span className="hidden-xs">{name}</span>
                        </a>
                        <ul className="dropdown-menu colorBar">
                            <li className="user-header colorBar ">

                                {this.state.img ? <img src={this.state.img}
                                    className="img-circle" alt="User Image" />
                                    :
                                    <img src={photos}
                                        className="img-circle" alt="User Image" />}
                                <div className='divFlex'>
                                    <button className='btn btn-primary btnAdd btn-xs' onClick={() => this.handleOpenModal(true)}>
                                        <i className='fa fa-plus'></i>
                                    </button>
                                </div>
                                <p>{name}<small>{email}</small></p>


                            </li>
                            <li className="user-footer">


                                <div className="pull-right">
                                    <a href="#" onClick={this.props.logout}
                                        className="btn btn-default btn-flat">Sair</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
                <Grid cols="12 4">
                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="Minimal Modal Example"
                        className="Modal "
                        overlayClassName="Overlay"
                    >
                        <div className='divFlex'>
                            {this.state.files ? <img src={this.state.files}
                                className="img-circle picmodal imgModal" alt="User Image" />
                                :
                                <img src={photos}
                                    className="img-circle picmodal imgModal" alt="User Image" />}
                        </div>

                        {/* 
                        <form role='form' onSubmit={this.props.update} encType="multipart/form-data">
                            <div className='divFlex'>
                                <Field type="file"  name="photos" component={FileInput} label='Upload File' onChange={this.handleChange} />
                                <Field type='hidden' name='_id' component={labelAndInput} /> 
                            </div>
                            <div className='divFlex'>
                                <button type="submit" className='btn btn-block btn-success btn-lg' onClick={this.changeUserID}>
                                    <i className='fa fa-upload'></i> Upload
                                </button>
                            </div>
                        </form> */}

                        <form onSubmit={this.onFormSubmit}>
                            <label className='labelFile' htmlFor="add">Selecionar Foto de perfil</label>
                            <input id='add' type="file" accept="image/*" onChange={this.onChange} />

                            <button type="submit" className='btn btn-block btn-success btn-lg'>
                                <i className='fa fa-upload'></i> Upload
                            </button>
                        </form>

                        <button className='btn btn-danger btnModal btn-xs' onClick={() => this.handleOpenModal(false)}>
                            <i className='fa fa-times'></i>
                        </button>
                    </ReactModal>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

