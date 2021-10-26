import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetform, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tabs/tabActions'




const BASE_URL = 'https://backend-studio-manager.herokuapp.com/alunos/alunos'
const INITIAL_VALUES = {}

export function getList() {
    const request = axios.get(BASE_URL)

    return {
        type: 'CADASTRO_ALUNO_FETCHED',
        payload: request,

    }
}




export async function submitSearch() {
    return  (dispatch, getState) => {
        const nameSearch = getState().cadastroAluno.nameSearch
       
         axios.get(`${BASE_URL}/search/${nameSearch}`)

             .then(resp => dispatch({
                 type: 'ALUNO_SEARCHED',
                 payload: resp.data,

             }))

    }

}

  export const changeName = event => ({
     type: 'NAME_CHANGED',
     payload: event.target.value
 })

 

    



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

export function showUpdate(cadastroAluno) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('cadastroAlunoForm', cadastroAluno),



    ]
}

export function showDelete(cadastroAluno) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('cadastroAlunoForm', cadastroAluno)

    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('cadastroAlunoForm', INITIAL_VALUES)
    ]
}



