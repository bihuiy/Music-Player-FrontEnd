import { useAudioPlayerContext } from "react-use-audio-player";
import { usePlayer } from "../../contexts/PlayerContext";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import { FaPlay, FaPause } from "react-icons/fa";
import './PlayPauseButton.css'

export default function PlayPauseButton({ song, songs, index, url }) {
  const { setPlaylist, setCurrentIndex } = usePlayer();
  const { load, togglePlayPause, isPlaying, src } = useAudioPlayerContext();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function handlePlayButton() {
    if (!user?._id) return navigate("/user/sign-up");
    if (src === url) {
      return togglePlayPause();
    }
    setPlaylist(songs);
    setCurrentIndex(index);
  }

  const playing = isPlaying && src === url
  const notPlaying = !playing

  return (
    <button  className={`playPauseButton${playing? "Playing" : "NotPlaying"}`} onClick={handlePlayButton}>
      {playing ? <FaPause/> : <FaPlay/>}
    </button>
  );
}
