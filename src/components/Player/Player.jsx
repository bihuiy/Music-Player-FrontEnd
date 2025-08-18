import "./Player.css";
import { useAudioPlayerContext } from "react-use-audio-player";
import { FaPlay, FaPause } from "react-icons/fa";
import { GoMute, GoUnmute } from "react-icons/go";
import { useEffect, useState } from "react";
import { usePlayer } from "../../contexts/PlayerContext";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";

const Player = () => {
  const { playlist, setPlaylist, currentIndex, setCurrentIndex } = usePlayer();
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

  useEffect(() => {
    if (src != null) setVolume(volume);
  }, [src, volume, setVolume]);

  useEffect(() => {
    if (!src) {
      setPosition(0);
      return;
    }
    const id = setInterval(() => {
      setPosition(getPosition());
    }, 250);
  }, [src, isPlaying, getPosition]);

  const handlePlayButtonClick = () => {
    if (!src) {
      const track = Array.isArray(playlist) ? playlist[currentIndex] : null;
      const url = track?.audioUrl || track?.url;
      if (url) {
        load(url, {
          autoplay: true,
          onend: () => {
            setCurrentIndex((i) => {
              const next = i + 1;
              return next < (playlist?.length || 0) ? next : 0;
            });
          },
        });
      }
      return;
    }
    togglePlayPause();
  };

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
