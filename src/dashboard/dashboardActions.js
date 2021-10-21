import axios from 'axios'

const BASE_URL = 'http://localhost:3003/alunos/summary'

export function getSummary(){
    const request = axios.get(BASE_URL)
    return{
        type:'BILLING_SUMMARY_FETCHED',
        payload: request
    }
}