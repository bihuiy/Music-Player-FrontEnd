import { useAudioPlayerContext } from "react-use-audio-player";

export default function PlayPauseButton({ song, url }) {
  const { load, togglePlayPause, isPaused, isPlaying, src } =
    useAudioPlayerContext();

  // Handle play/pause button click
  function handlePlayButton() {
    if (src === url) {
      // If the same song is currently loaded, toggle play/pause
      return togglePlayPause();
    } // else, load the new song and autoplay
    load(url, {
      autoplay: true,
    });
  }

  return (
    <button onClick={handlePlayButton}>
      {isPlaying && src === url ? "Pause" : "Play"}
    </button>
  );
}
