import PlayPauseButton from "../../SongPlayPauseButton/PlayPauseButton";
import LikeButton from "../../LikeButton/LikeButton";
import './SongItem.css'
export default function SongItem({
  song,
  songs,
  index,
  user,
  handleOpenModal,
}) {
  return (
    <div className="song-item">
      <PlayPauseButton song={song} songs={songs} index={index} url={song.url} />
      <span>
        {song.title} by {song.artist}
      </span>
      <button onClick={() => handleOpenModal(song)}>Add to Playlist</button>
      <LikeButton song={song} user={user} />
    </div>
  );
}
