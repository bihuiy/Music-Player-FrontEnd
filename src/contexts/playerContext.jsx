import { createContext, useContext, useState } from "react"

const PlayerContext = createContext()

const PlayerProvider = ({children}) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [playlist, setPlaylist] = useState([])
    const [trackName, setTrackName] = useState('')

    return (
        <PlayerContext.Provider value={{ currentIndex, setCurrentIndex, playlist, setPlaylist }}>
        {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => useContext(PlayerContext)
export {PlayerProvider}