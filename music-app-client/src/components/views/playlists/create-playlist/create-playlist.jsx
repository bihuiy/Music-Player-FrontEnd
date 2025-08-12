import './create-playlist.css'
import '../../../../styles/forms.css'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const CreatePlaylist = () =>{
    const [formData, setFormData] = useState({
        title: ''
    })
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const {data} = await signUp(formData)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
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
                <input type="text" name='title' placeholder='A Cool Playlist Title' value={formData.name} onChange={handleChange} />
                <button className='createPlaylist'type="submit">Create</button>
            </form>
        </>
    )
}

export default CreatePlaylist