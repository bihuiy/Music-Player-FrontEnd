import { playlistIndex } from "../../../../services/playlists"
import './explore-playlists.css'
import {useEffect, useState} from 'react'
import ErrorPage from "../../error-page/error-page"
import LoadingPage from "../../loading-page/loading-page"

const ExplorePlaylists = () =>{
    const [playlists, setPlaylists] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setErrors] = useState(null)

    useEffect(() => {
        const getPlaylistData = async () => {
            setIsLoading(true)
            try {
                const { data } = await playlistIndex()
                setPlaylists(data)
            } catch (error) {
                setErrors(error)
            } finally {
                setIsLoading(false)
            }
        }
        getPlaylistData()
    }, [])

    if (isLoading) return <LoadingPage />

    if (error) return <ErrorPage error={error}/>
    return(
        <>
            <h1>ExplorePlaylists</h1>
        </>
    )
}

export default ExplorePlaylists