import axios from 'axios'


const URL = 'https://backend-studio-manager.herokuapp.com/fileupload'


export function getList() {
    const request = axios.get(URL)
    return {
        type: 'PHOTO_FETCHED',
        payload: request,
    }
    
}