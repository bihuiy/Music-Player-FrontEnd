import { playlistIndex } from "../../../../services/playlists";
import "./Explore-playlists.css";
import { useEffect, useState } from "react";
import ErrorPage from "../../ErrorPage/ErrorPage";
import LoadingPage from "../../LoadingPage/LoadingPage";
import PlaylistTile from "../../../Playlist-tile/Playlist-tile";

const ExplorePlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState(null);

  useEffect(() => {
    const getPlaylistData = async () => {
      setIsLoading(true);
      try {
        const { data } = await playlistIndex();
        setPlaylists(data);
      } catch (error) {
        setErrors(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPlaylistData();
  }, []);

  if (isLoading) return <LoadingPage />;

  if (error) return <ErrorPage error={error} />;
  return (
    <>
      <h1>Explore Playlists</h1>
      <div className="playlists-grid">
        {playlists.length > 0 ? (
          playlists.map((playlist) => {
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
    </>
  );
};

export default ExplorePlaylists;
