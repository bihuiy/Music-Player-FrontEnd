import '../../styles/forms.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { editPlaylist, getPlaylist } from '../../services/playlists'

const EditPlaylistForm = ({playlist}) =>{
    const [formData, setFormData] = useState({
        title: ''
    })
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate()

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

    return(
        <>
            <form className="form" onSubmit={handleSubmit}>
                {playlist.coverArt 
                ?(
                    <img className='coverArt'
                    src={playlist.coverArt}
                    alt={`${playlist.title} cover`}
                    />
                )
                
                :(<img className='coverArt'
                    src={'https://res.cloudinary.com/dhdhyhahn/image/upload/v1755012671/5b3d5b19-045d-486b-822e-e8bc5fe8c16c.png'}
                    alt={`${playlist.title} cover`}
                />)
                }
                <label htmlFor="title">Playlist Title</label>
                <input type="text" name='title' placeholder='A Cool Playlist Title' value={formData.title} onChange={handleChange} />
                {errors.title && <p className='error-message'>{errors.title}</p>}
                <button className='saveChanges'type="submit">{submitting ? 'submitting...' : 'Save Changes'}</button>
            </form>
        </>
    )
}

export default EditPlaylistForm