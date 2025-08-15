import { useAudioPlayerContext } from "react-use-audio-player";
import { usePlayer } from "../../contexts/PlayerContext";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import { FaPlay, FaPause } from "react-icons/fa";

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

  return (
    <button onClick={handlePlayButton}>
      {isPlaying && src === url ? <FaPause/> : <FaPlay/>}
    </button>
  );
}
