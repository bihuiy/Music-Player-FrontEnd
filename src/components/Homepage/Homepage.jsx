import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./Homepage.css";
import "../ExplorePlaylistsPage/ExplorePlaylistsPage.css";
import { homePage } from "../../services/homepage";
import PlaylistTile from "../PlaylistTile/PlaylistTile";
import { GiMusicSpell } from "react-icons/gi";

// * Page components
import ErrorPage from "../ErrorPage/ErrorPage";
import LoadingPage from "../LoadingPage/LoadingPage";
import SongItem from "../SongItem/SongItem";
import AddToPlaylistWrapper from "../AddToPlaylistWrapper/AddToPlaylistWrapper";

export default function Homepage() {
  const { user } = useContext(UserContext);

  // * State
  const [topPlaylists, setTopPlaylists] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { handleOpenModal, modalComponent } = AddToPlaylistWrapper();

  useEffect(() => {
    const getHomepageData = async () => {
      setIsLoading(true);
      try {
        const { data } = await homePage();
        setTopPlaylists(data.topPlaylists);
        setTopSongs(data.topSongs);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getHomepageData();
  }, []);

  if (error) return <ErrorPage error={error} />;
  if (isLoading) return <LoadingPage />;

  return (
    <>
      <h1>
        Amplify <GiMusicSpell /> Homepage
      </h1>
      <h2>Check out our top playlists:</h2>
      <div className="playlists-grid">
        {topPlaylists.length > 0 ? (
          topPlaylists.map((playlist) => {
            return (
              <div key={playlist._id} className="playlistTile">
                <PlaylistTile playlist={playlist} />
              </div>
            );
          })
        ) : (
          <p>There are no Playlists</p>
        )}
      </div>

      <div>
        <h2>Check out our top songs:</h2>
        {topSongs.length > 0 ? (
          topSongs.map((song, index) => {
            return (
              <SongItem
                key={song._id}
                song={song}
                songs={topSongs}
                index={index}
                user={user}
                handleOpenModal={handleOpenModal}
              />
            );
          })
        ) : (
          <p>There are no songs</p>
        )}
      </div>
      {modalComponent}
    </>
  );
}
