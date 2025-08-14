import './BookmarkButton.css'
import { bookmarkPlaylist, unbookmarkPlaylist } from '../../services/playlists'
import { useContext, useEffect, useState } from 'react'
import { LuBookmarkPlus, LuBookmarkMinus } from "react-icons/lu";
import { UserContext } from '../../contexts/UserContext';



export default function BookmarkButton({playlist}) {
    const {user} = useContext(UserContext)

    const isbookmarked = (playlist.userBookmarks.some(u => (u._id?? u) === user._id))
    const [bookmarked, setBookmarked] = useState(isbookmarked)
    



    const handleClick = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            if(bookmarked){
                await unbookmarkPlaylist(playlist._id)
            } else{
                await bookmarkPlaylist(playlist._id)
            }
            setBookmarked(!bookmarked)
        } catch (error) {
            console.log(error)
        }
    }

    const bookmark = bookmarked ? <LuBookmarkMinus /> : <LuBookmarkPlus />

    return(
        <>

        <button className="bookmarkIcon" onClick={handleClick}>{bookmark}</button>
        </>
    )
        
        
    
}