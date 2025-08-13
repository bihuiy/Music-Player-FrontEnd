import { useEffect, useState } from "react";
import "./homepage.css";
import '../playlists/explore-playlists/explore-playlists.css'
import { homePage } from "../../../services/homepage";
import PlaylistTile from "../../playlist-tile/playlist-tile";

// Page components
import ErrorPage from "../error-page/error-page";

export default function Homepage() {
  // * State
  const [topPlaylists, setTopPlaylists] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHomepageData = async () => {
      try {
        const { data } = await homePage();
        setTopPlaylists(data.topPlaylists);
        setTopSongs(data.topSongs);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    getHomepageData();
  }, []);

  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <h1>Music Player Homepage</h1>
      <h2>Check out our top playlists:</h2>
      <div className="playlists-grid">
                {topPlaylists.length > 0
                ? topPlaylists.map(playlist =>{
                    return(
                        <div key={playlist._id} className="playlistTile">
                            <PlaylistTile playlist={playlist} />
                        </div>
                        
                    )
                })
                :
                <p>There are no Playlists</p>
                }
            </div>
      <h2>Check out our top songs:</h2>
      <ul>
        {topSongs.map((song) => (
          <li key={song._id}>
            {song.title} by {song.artist}
          </li>
        ))}
      </ul>
    </>
  );
}
