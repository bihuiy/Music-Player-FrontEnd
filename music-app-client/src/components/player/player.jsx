import './player.css'
import { useAudioPlayerContext } from "react-use-audio-player";
import { FaPlay, FaPause } from "react-icons/fa";



const Player = () => {
const {togglePlayPause, isPlaying, src, load, seek, getPosition, setVolume, toggleMute} = useAudioPlayerContext()
    const handleButtonClick = () =>{
        if (src) return togglePlayPause()
    }
    return(
        <>
        <div className="songInfo"></div>
        <div className="playerControls">
            <button className="togglePause"onClick={handleButtonClick}>{isPlaying ? <FaPause /> : <FaPlay/>} </button>
        </div>
        <div className="volumeControls"></div>
        </>
    )
}

export default Player