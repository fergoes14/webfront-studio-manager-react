import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { submit } from 'redux-form'

const BASE_URL = 'http://localhost:3000/fileupload'

export function update(values) {
    return dispatch => {
        const id = values._id
        axios.put(`${BASE_URL}/${id}`, values)
            .then(resp =>{
                toastr.success('Sucesso', 'Operação realizada com sucesso')
            })
    }
}