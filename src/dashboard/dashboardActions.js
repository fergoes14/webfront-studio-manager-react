import axios from 'axios'

const BASE_URL = 'https://backend-studio-manager.herokuapp.com/alunos/summary'

export function getSummary(){
    const request = axios.get(BASE_URL)
    return{
        type:'BILLING_SUMMARY_FETCHED',
        payload: request
    }
}