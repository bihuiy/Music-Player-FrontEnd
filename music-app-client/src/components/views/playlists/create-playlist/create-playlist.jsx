import './create-playlist.css'
import '../../../../styles/forms.css'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { createPlaylist } from '../../../../services/playlists'

const CreatePlaylist = () =>{
    const [formData, setFormData] = useState({
        title: ''
    })
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const {data} = await createPlaylist(formData)
            navigate('/playlists')
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        } finally {
            setSubmitting(false)
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return(
        <>
            
            <form className="form" onSubmit={handleSubmit}>
                <h1>CreatePlaylist</h1>
                <label htmlFor="title">Playlist Title</label>
                <input type="text" name='title' placeholder='A Cool Playlist Title' value={formData.title} onChange={handleChange} />
                {errors.title && <p className='error-message'>{errors.title}</p>}
                <button className='createPlaylist'type="submit">Create</button>
            </form>
        </>
    )
}

export default CreatePlaylist