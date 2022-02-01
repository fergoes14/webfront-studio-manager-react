import axios from 'axios'


const URL = 'http://localhost:3000/fileupload'


export function getList() {
    const request = axios.get(URL)
    return {
        type: 'PHOTO_FETCHED',
        payload: request,
    }
    
}