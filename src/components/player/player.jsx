import "./Player.css";
import { useAudioPlayerContext } from "react-use-audio-player";
import { FaPlay, FaPause } from "react-icons/fa";
import { GoMute, GoUnmute } from "react-icons/go";
import { useEffect, useState } from "react";
import { usePlayer } from "../../contexts/PlayerContext";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";

const Player = () => {
  const { playlist, currentIndex, setCurrentIndex } = usePlayer();
  const {
    togglePlayPause,
    isPlaying,
    src,
    load,
    seek,
    getPosition,
    setVolume,
    volume,
    toggleMute,
    isMuted,
    duration,
  } = useAudioPlayerContext();

  const [position, setPosition] = useState(0);
  const currentTrack = Array.isArray(playlist) ? playlist[currentIndex] : null;

  const skipTrack = (n) => {
    setCurrentIndex((i) => {
      const next = i + n;
      return next < (playlist?.length || 0) ? next : 0;
    });
  };

  // * Handle loading the track
  useEffect(() => {
    const track = Array.isArray(playlist) ? playlist[currentIndex] : null;
    const url = track?.audioUrl || track?.url;

    if (!url) return;

    load(url, {
      autoplay: true,
      initialVolume: 0.5,
      onend: () => skipTrack(1),
    });
  }, [playlist, currentIndex, load, setCurrentIndex]);

  // * Handle volume
  useEffect(() => {
    if (src != null) setVolume(volume);
  }, [src, volume, setVolume]);

  // * Handle playback progress
  useEffect(() => {
    if (!src) {
      setPosition(0);
      return;
    }
    const id = setInterval(() => {
      setPosition(getPosition());
    }, 250);
  }, [src, isPlaying, getPosition]);

  // * Function
  const handlePlayButtonClick = () => {
    // If there is no audio source (src is empty), it means no song has been loaded yet
    if (!src) {
      // Get the current track from the playlist using the current index
      const track = Array.isArray(playlist) ? playlist[currentIndex] : null;
      // Get the track's audio URL, prefer audioUrl; if not available, use url
      const url = track?.audioUrl || track?.url;
      if (url) {
        // If there is a URL, load the track
        load(url, {
          autoplay: true, // Automatically play after loading
          onend: () => {
            // Triggered when the song ends
            setCurrentIndex((i) => {
              // Update the current index to the next track
              const next = i + 1;
              return next < (playlist?.length || 0) ? next : 0; // If the next index is within the playlist length, return next; otherwise start from the beginning (loop)
            });
          },
        });
      }
      return;
    }
    // If there is already a src, the song is loaded; just toggle play/pause
    togglePlayPause();
  };
  
  // * Handel user drags the seek bar to allow audio jumps to the corresponding time
  const handleSeek = (e) => {
    const newTime = e.target.value;
    seek(newTime);
    setPosition(newTime);
  };

  return (
    <div className="playerBar">
      <div className="songInfo">
        {currentTrack ? currentTrack.title : "Nothing is playing"}
      </div>
      <div className="playerControls">
        <div className="controlButtons">
          <button className="skipBack" onClick={() => skipTrack(-1)}>
            <IoMdSkipBackward />
          </button>
          <button className="togglePause" onClick={handlePlayButtonClick}>
            {isPlaying ? <FaPause /> : <FaPlay />}{" "}
          </button>
          <button className="skipForwards" onClick={() => skipTrack(1)}>
            <IoMdSkipForward />
          </button>
        </div>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.01}
          value={position}
          onChange={handleSeek}
          className="progressBar"
        />
      </div>
      <div className="volumeControls">
        <button className="muteButton" onClick={toggleMute}>
          {isMuted ? <GoMute /> : <GoUnmute />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          className="volumeBar"
          value={volume ?? 1}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Player;
