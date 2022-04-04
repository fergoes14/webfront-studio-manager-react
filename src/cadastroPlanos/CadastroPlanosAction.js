import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetform, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tabs/tabActions'




const BASE_URL = 'https://backend-studio-manager.herokuapp.com/planos'
const INITIAL_VALUES = {}

export function getList() {
    const request = axios.get(BASE_URL)

    return {
        type: 'CADASTRO_PLANOS_FETCHED',
        payload: request,

    }
}
 
export function create(values) {
    return submit(values, 'post',
    )

}

export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')

}




function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.message.forEach(error => toastr.error('Erro', error))
            })
    }

}

export function showUpdate(cadastroPlanos) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('cadastroPlanosForm', cadastroPlanos),



    ]
}

export function showDelete(cadastroPlanos) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('cadastroPlanosForm', cadastroPlanos)

    ]
}
export function showEvo(cadastroPlanos) {
    return [
        showTabs('tabEvo'),
        selectTab('tabEvo'),
        initialize('cadastroPlanosForm', cadastroPlanos)

    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('cadastroPlanosForm', INITIAL_VALUES)
    ]
}



