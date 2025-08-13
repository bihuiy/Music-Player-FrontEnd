import './player.css'
import { useAudioPlayerContext } from "react-use-audio-player";
import { FaPlay, FaPause, } from "react-icons/fa";
import { GoMute, GoUnmute } from 'react-icons/go'
import { useEffect, useState } from 'react';



const Player = () => {
const {togglePlayPause, isPlaying, src, load, seek, getPosition, setVolume, toggleMute, isMuted, duration,} = useAudioPlayerContext()
    
    const[position, setPosition] = useState(0)

    useEffect(() => {
        if(!src) {setPosition(0); return}
        const id = setInterval(() => {
            setPosition(getPosition())
        }, 250)
    }, [src])

const handlePlayButtonClick = () =>{
        if (src) return togglePlayPause()
    }

    const handleSeek = (e) => {
        const newTime = e.target.value
        seek(newTime)
        setPosition(newTime)
    }


    return(
        <div className='playerBar'>
            <div className="songInfo"></div>
            <div className="playerControls">
                <div className="controlButtons">
                    <button className="togglePause" onClick={handlePlayButtonClick}>{isPlaying ? <FaPause /> : <FaPlay/>} </button>
                </div>
                    <input type="range" min={0} max={duration} step={0.01} value={position} onChange={handleSeek} className="progressBar"  />
            </div>
            <div className="volumeControls">
                <button className='muteButton' onClick={(toggleMute)}>{isMuted ? <GoMute /> : <GoUnmute />}</button>
                <input type="range" min={0} max={1} step={0.01} className="volumeBar" onChange={(e) => setVolume(parseFloat(e.target.value))}/>
            </div>
        </div>
    )
}

export default Player