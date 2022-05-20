import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetform, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tabs/tabActions'




const BASE_URL = 'https://backend-studio-react.herokuapp.com/salas'
const INITIAL_VALUES = {}

export function getList() {
    const request = axios.get(BASE_URL)

    return {
        type: 'CADASTRO_SALAS_FETCHED',
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

export function showUpdate(cadastroSalas) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('cadastroSalasForm', cadastroSalas),



    ]
}

export function showDelete(cadastroSalas) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('cadastroSalasForm', cadastroSalas)

    ]
}
export function showEvo(cadastroSalas) {
    return [
        showTabs('tabEvo'),
        selectTab('tabEvo'),
        initialize('cadastroSalasForm', cadastroSalas)

    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('cadastroSalasForm', INITIAL_VALUES)
    ]
}



