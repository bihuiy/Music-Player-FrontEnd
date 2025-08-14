import axios from "axios"

const BASE_URL = import.meta.env.VITE_CLOUDINARY_URL

export const uploadImage = (file) => {
    return axios.postForm(BASE_URL, {
        file,
        upload_preset: import.meta.env.VITE_UPLOAD_PRESET
    })
}