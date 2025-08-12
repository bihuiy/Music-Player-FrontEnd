import axios from 'axios'


const BASE_URL = import.meta.env.VITE_API_URL + '/playlists'

export const playlistIndex = () => {
    return axios.get(BASE_URL)
}

export const createPlaylist = async (payload) => {
    const token = locanStorage.getItem('token')
    const {data} = await axios.post(
        BASE_URL,
        payload,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    )
    return data
}