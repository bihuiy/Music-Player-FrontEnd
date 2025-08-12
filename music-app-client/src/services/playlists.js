import axios from 'axios'
import { getToken } from '../utils/auth'

const BASE_URL = import.meta.env.VITE_API_URL + '/playlists'

export const playlistIndex = () => {
    return axios.get(BASE_URL)
}

export const createPlaylist =  (formData) => {
    return axios.post(
        BASE_URL,
        formData,
        { headers: { Authorization: `Bearer ${getToken()}` } }
    )
}