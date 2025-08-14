import './player.css'
import { useAudioPlayerContext } from "react-use-audio-player";
import { FaPlay, FaPause, } from "react-icons/fa";
import { GoMute, GoUnmute } from 'react-icons/go'
import { useEffect, useState } from 'react';
import { usePlayer } from '../../contexts/playerContext';



const Player = () => {
    const { playlist, setPlaylist, currentIndex, setCurrentIndex } = usePlayer()
    const {togglePlayPause, isPlaying, src, load, seek, getPosition, setVolume, volume, toggleMute, isMuted, duration,} = useAudioPlayerContext()
    
    const[position, setPosition] = useState(0)

    useEffect(() => {

        const track = Array.isArray(playlist) ? playlist[currentIndex] : null
        const url = track?.audioUrl || track?.url

        if (!url) return

        load(url, {
            autoplay: true,
            initialVolume: volume,
            onend: () => {
            setCurrentIndex(i => {
                const next = i + 1
                return next < (playlist?.length || 0) ? next : 0
            })
            },
        })
    }, [playlist, currentIndex, load, setCurrentIndex])

    useEffect(() => {
        if (src != null) setVolume(volume)
    }, [src, volume, setVolume])

    useEffect(() => {
        if(!src) {setPosition(0); return}
        const id = setInterval(() => {
            setPosition(getPosition())
        }, 250)
    }, [src, isPlaying, getPosition])

const handlePlayButtonClick = () =>{
        if (!src) {
            const track = Array.isArray(playlist) ? playlist[currentIndex] : null
            const url = track?.audioUrl || track?.url
            if (url) {
                load(url, {
                    autoplay: true,
                    onend: () => {
                        setCurrentIndex(i => {
                            const next = i + 1
                            return next < (playlist?.length || 0) ? next : 0
                        })
                    },
                })
            }
            return
        }
        togglePlayPause()
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
                <input type="range" min={0} max={1} step={0.01} className="volumeBar" value={volume ?? 1} onChange={(e) => setVolume(parseFloat(e.target.value))}/>
            </div>
        </div>
    )
}

export default Player