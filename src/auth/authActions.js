import axios from "axios";
import { toastr } from 'react-redux-toastr'

const BASE_URL = 'http://localhost:3000'

export function signup(values) {
    return dispatch => {
        axios.post(`${BASE_URL}/users`, values)
            .then(resp => {

                toastr.success('sucesso', 'Email ou senha incorreto.')
            })
            .catch(e => {
                e.response.data.message.forEach(error => toastr.error('Erro', error))
            })
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
        axios.post(`${BASE_URL}/auth/refreshtoken`, {access_token,refreshToken})
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



