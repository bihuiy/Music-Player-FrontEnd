import './playlist-tile.css'
import { Link } from 'react-router'

export default function PlaylistTile({playlist}) {
    return(
        <Link to={`/playlists/${playlist._id}`}>
            <div className='playlistCard'>
                <div className='coverArtWrapper'>
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
                </div>
                <div className='playlistInfo'>
                    <h3>{playlist.title}</h3>
                    <p>Created by: {playlist.owner?.username || "Unknown"}</p>
                </div>
            </div>
        </Link>
        
    )
}