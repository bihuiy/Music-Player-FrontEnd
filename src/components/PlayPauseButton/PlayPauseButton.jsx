import { useAudioPlayerContext } from "react-use-audio-player";
import { usePlayer } from "../../contexts/PlayerContext";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import { FaPlay, FaPause } from "react-icons/fa";
import "./PlayPauseButton.css";

export default function PlayPauseButton({ songs, index, url }) {
  const { setPlaylist, setCurrentIndex } = usePlayer();
  // * Context
  const { togglePlayPause, isPlaying, src } = useAudioPlayerContext();
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

  const playing = isPlaying && src === url;

  return (
    <button
      className={`playPauseButton${playing ? "Playing" : "NotPlaying"}`}
      onClick={handlePlayButton}
    >
      {playing ? <FaPause /> : <FaPlay />}
    </button>
  );
}
