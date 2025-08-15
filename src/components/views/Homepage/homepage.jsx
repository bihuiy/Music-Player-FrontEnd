import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../contexts/UserContext";
import "./Homepage.css";
import "../Playlists/Explore-playlists/Explore-playlists.css";
import { homePage } from "../../../services/homepage";
import PlaylistTile from "../../Playlist-tile/Playlist-tile";

// Page components
import ErrorPage from "../ErrorPage/ErrorPage";
import LoadingPage from "../LoadingPage/LoadingPage";
import SongItem from "../Songs/SongItem";
import AddToPlaylistModal from "../Songs/AddToPlaylistModal";
import { addSongToPlaylist } from "../../../services/songs";
import { createdPlaylistsShow } from "../../../services/profiles";

export default function Homepage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // * State
  const [topPlaylists, setTopPlaylists] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  // Fetch current login user's playlists
  useEffect(() => {
    const getCreatedPlaylistsData = async () => {
      if (!user?._id) {
        setPlaylists([]);
        return;
      }
      try {
        const { data } = await createdPlaylistsShow(user._id);
        setPlaylists(data.createdPlaylists);
      } catch (error) {
        setError(error);
      }
    };
    getCreatedPlaylistsData();
  }, []);

  // Open modal and set the song to add
  function handleOpenModal(song) {
    if (!user?._id) return navigate("/user/sign-up");
    setSelectedSong(song);
    setModalShow(true);
  }

  if (error) return <ErrorPage error={error} />;
  if (isLoading) return <LoadingPage />;

  return (
    <>
      <h1>Music Player Homepage</h1>
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
        {selectedSong && (
          <AddToPlaylistModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            song={selectedSong}
            playlists={playlists}
            onAdd={addSongToPlaylist}
          />
        )}
      </div>
    </>
  );
}
