import './playlist-tile.css'

export default function PlaylistTile({playlist}) {
    return(
        <div className='playlistCard'>
            <div className='coverArt'>

            </div>
            <div className='playlistInfo'>
                <p>{playlist.title}</p>
                <p>{playlist.owner?.username || "Unknown"}</p>
            </div>
        </div>
    )
}