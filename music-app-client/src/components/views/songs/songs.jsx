import { useEffect, useState } from "react";
import { getAllSongs } from "../../../services/songs";
import "./songs.css";
import { useAudioPlayerContext } from "react-use-audio-player";

// Page components
import ErrorPage from "../error-page/error-page";
import { useParams } from "react-router";
import LoadingPage from "../loading-page/loading-page";



function PlayPauseButton({song, url}){
  const { load, togglePlayPause, isPaused, isPlaying, src } = useAudioPlayerContext()
    function handlePlayButton() {
      if (src === url){
        return togglePlayPause()
      }
      console.log(url)
      load(url, {
        autoplay: true,
      
      })
    }

    return (
        <button onClick={handlePlayButton}>
            {isPlaying && (src === url) ? "Pause" : "Play"}
        </button>
    )
  }

export default function Songs() {
  const { userId } = useParams();
  // * State
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllSongsData = async () => {
      setIsLoading(true);
      try {
        const { data } = await getAllSongs();
        setSongs(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllSongsData();
  }, []);

  if (error) return <ErrorPage error={error} />;
  if (isLoading) return <LoadingPage />;

  return (
    <>
      <h1>Explore songs</h1>
      <div>
        {songs.length > 0 ? (
          songs.map((song) => {
            return (
              <li key={song._id}>
                <p>{song.title}</p>
                <PlayPauseButton song={song} url={song.url}/>
              </li>
            );
          })
        ) : (
          <p>There are currently no songs to display</p>
        )}
      </div>
    </>
  );
}
