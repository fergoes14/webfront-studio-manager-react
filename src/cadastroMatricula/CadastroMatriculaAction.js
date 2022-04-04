import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetform, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tabs/tabActions'




const BASE_URL = 'https://backend-studio-manager.herokuapp.com/matriculas'
const INITIAL_VALUES = {}

export function getList() {
    const request = axios.get(BASE_URL)

    return {
        type: 'CADASTRO_MATRICULA_FETCHED',
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

export function showUpdate(cadastroMatricula) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('cadastroMatriculaForm', cadastroMatricula),



    ]
}

export function showDelete(cadastroMatricula) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('cadastroMatriculaForm', cadastroMatricula)

    ]
}
export function showEvo(cadastroMatricula) {
    return [
        showTabs('tabEvo'),
        selectTab('tabEvo'),
        initialize('cadastroMatriculaForm', cadastroMatricula)

    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('cadastroMatriculaForm', INITIAL_VALUES)
    ]
}



