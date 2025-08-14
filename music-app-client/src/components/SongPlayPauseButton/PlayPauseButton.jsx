import { useAudioPlayerContext } from "react-use-audio-player";
import { usePlayer } from "../../contexts/playerContext";

export default function PlayPauseButton({song, songs, index, url}){
  const { setPlaylist, setCurrentIndex } = usePlayer();
  const { load, togglePlayPause, isPlaying, src } = useAudioPlayerContext()

    function handlePlayButton() {
    
      if (src === url){
        return togglePlayPause()
      }
      setPlaylist(songs)
      setCurrentIndex(index)
    }

    return (
        <button onClick={handlePlayButton}>
            {isPlaying && (src === url) ? "Pause" : "Play"}
        </button>
    )
  }