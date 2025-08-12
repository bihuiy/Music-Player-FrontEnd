import './show-playlist.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getPlaylist } from '../../../../services/playlists'
import ErrorPage from "../../error-page/error-page"
import LoadingPage from "../../loading-page/loading-page"

const ShowPlaylist = () =>{
    const {playlistId} = useParams()
    const [playlist, setPlaylist] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)


    useEffect(() => {
        const getPlaylistData = async () => {
                    setIsLoading(true)
                    try {
                        const { data } = await getPlaylist(playlistId)
                        setPlaylist(data)
                    } catch (error) {
                        setError(error)
                    } finally {
                        setIsLoading(false)
                    }
                }
                getPlaylistData()
    }, [playlistId])

    if (isLoading) return <LoadingPage />
    if (error) return <ErrorPage error={error} />
    if (!playlist) return <p>Playlist not found :(</p>
    return(
        <main>
            <div className="playlistHead">{playlist.coverArt 
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
            <div className="playlistInfo">
                <h1>{playlist.title}</h1>
                <h2>Created by {playlist.owner.username}</h2></div>
            </div>
            
            
            {playlist.songs.length > 0
            ? <ul>
                {playlist.songs.map((song) => {
                    <li key={song._id}>
                        {song.title} by {song.artist}
                    </li>
                })}
            </ul>
            : <p>Playlist is empty</p>
            }
            
        </main>
    )
}

export default ShowPlaylist