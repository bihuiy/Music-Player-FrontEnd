import { useAudioPlayer } from "react-use-audio-player";

export default function AudioPlayer({ song }) {
  const { togglePlayPause, playing } = useAudioPlayer({
    src: song.url,
    format: "wav",
    autoplay: false,
    volume: 1.0,
  });

  return (
    <button onClick={togglePlayPause}>
      {playing ? "Pause" : "Play"}
    </button>
  );
}
