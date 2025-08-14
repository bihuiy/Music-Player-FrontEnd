import '../../styles/forms.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { editPlaylist, getPlaylist } from '../../services/playlists'
import ImageUploadField from '../ImageUploadField/ImageUploadField'

const EditPlaylistForm = ({playlist}) =>{
    const [formData, setFormData] = useState({
        title: ''
    })
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()
    const [isUploading, setIsUploading] = useState(false)

    const [prefillError, setPrefillError] = useState('')

    const { playlistId } = useParams()

    useEffect(() => {
        const getPlaylistData = async () => {
            try {
                const { data} = await getPlaylist(playlistId)
                setFormData(data)
            } catch (error) {
                setPrefillError('Unable to fetch playlist details, try again.')
            }
        }
        getPlaylistData()
    }, [playlistId])

    const handleSubmit = async(e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const {data} = await editPlaylist(playlistId, formData)
            navigate(`/playlists/${data._id}`)
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
                
                <ImageUploadField image="CoverArt" setImage ={setcoverArt} imageUrl={formData.coverArt} setIsUploading={setIsUploading} playlistImage={playlist.coverArt} showPlaceholder={true}/>
                
                <label htmlFor="title">Playlist Title</label>
                <input type="text" name='title' placeholder='A Cool Playlist Title' value={formData.title} onChange={handleChange} />
                {errors.title && <p className='error-message'>{errors.title}</p>}
                <button className='saveChanges' disabled={isUploading || submitting}type="submit">{buttonLabel}</button>
            </form>
        </>
    )
}

export default EditPlaylistForm