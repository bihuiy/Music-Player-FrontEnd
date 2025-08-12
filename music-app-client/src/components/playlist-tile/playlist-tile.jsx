import './playlist-tile.css'
import { Link } from 'react-router'

export default function PlaylistTile({playlist}) {
    return(
        <Link to={`/playlists/${playlist._id}`}>
            <div className='playlistCard'>
                <div className='coverArt'></div>
                <div className='playlistInfo'>
                    <p>{playlist.title}</p>
                    <p>{playlist.owner?.username || "Unknown"}</p>
                </div>
            </div>
        </Link>
        
    )
}