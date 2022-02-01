import axios from "axios";
import { toastr } from 'react-redux-toastr'

import { reset as resetform, initialize } from 'redux-form'
//const BASE_URL = 'https://backend-studio-manager.herokuapp.com'
const BASE_URL = 'http://localhost:3000'
const URL_UP = 'http://localhost:3000/fileupload'

export function signup(values) {

    return dispatch => {
        if (values.confirm_password === values.password) {
            axios.post(`${BASE_URL}/users`, values)
                .then(resp => {
                    dispatch([
                        { type: 'USER_VALID', payload: true }
                    ])
                    toastr.success('sucesso', 'Cadastro efetuado com sucesso.')
                })
                .catch(e => {
                    e.response.data.message.forEach(error => toastr.error('Erro', error))
                })
        } else {
            dispatch([
                { type: 'USER_VALID', payload: false }
            ])
            toastr.error('ERRO', "A confirmação de senha não confere")
        }
    }


}

export function login(values) {

    return dispatch => {
        axios.post(`${BASE_URL}/auth/login`, values)
            .then(resp => {
                dispatch([
                    { type: 'USER_FETCHED', payload: resp.data },

                ])
            })
            .catch(resp => {
                toastr.error('ERRO', 'Email ou senha incorreto.')
            })

    }

}

export function refreshToken(access_token, refreshToken) {

    return dispatch => {
        axios.post(`${BASE_URL}/auth/refreshtoken`, { access_token, refreshToken })
            .then(resp => {
                dispatch([
                    { type: 'USER_FETCHED', payload: resp.data },

                ])
            })

    }

}

export function logout() {
    return { type: 'TOKEN_VALIDATED', payload: false }
}

export function update(values) {
    return dispatch => {
        axios.put(`${BASE_URL}/users/618bcfda94a6b9051d214655`, values,{
           
        })
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso')
            })
    }
}

export function showUpdate(cadastroAluno) {
    return [
        initialize('cadastroAlunoForm', cadastroAluno),
    ]
}

export function validateToken(validtoken) {
    return dispatch => {
        if (validtoken) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + validtoken
            axios.get(`${BASE_URL}/alunos/validtoken`)
                .then(resp => {
                    dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data.token })
                })
                .catch(resp => dispatch({ type: 'TOKEN_VALIDATED', payload: false }))
        } else {
            dispatch({ type: 'TOKEN_VALIDATED', payload: false })
        }
    }
}



