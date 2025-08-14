import './Create-playlist.css'
import '../../../../styles/forms.css'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { createPlaylist } from '../../../../services/playlists'
import ImageUploadField from '../../../ImageUploadField/ImageUploadField'

const CreatePlaylist = () =>{
    const [formData, setFormData] = useState({
        title: '',
        coverArt: ''
    })
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const [isUploading, setIsUploading] = useState(false)

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

    const setcoverArt = (url) =>{
        setFormData({...formData, coverArt: url})
    }

    const buttonLabel = isUploading
        ? 'Uploading cover art...'
        : submitting
        ? 'submitting...'
        : 'Save Changes'

    return(
        <>
            
            <form className="form" onSubmit={handleSubmit}>
                <h1>CreatePlaylist</h1>

                <ImageUploadField image="CoverArt" setImage ={setcoverArt} imageUrl={formData.coverArt} setIsUploading={setIsUploading}/>

                <label htmlFor="title">Playlist Title</label>
                <input type="text" name='title' placeholder='A Cool Playlist Title' value={formData.title} onChange={handleChange} />
                {errors.title && <p className='error-message'>{errors.title}</p>}
                <button className='createPlaylist' disabled={isUploading || submitting}type="submit">{buttonLabel}</button>
            </form>
        </>
    )
}

export default CreatePlaylist