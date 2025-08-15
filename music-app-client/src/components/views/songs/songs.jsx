import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import "./Songs.css";

import { useNavigate } from "react-router";

// * Page components
import ErrorPage from "../ErrorPage/ErrorPage";
import LoadingPage from "../LoadingPage/LoadingPage";
import SongItem from "./SongItem";
import AddToPlaylistModal from "./AddToPlaylistModal";

// * Services / utils
import { getAllSongs, addSongToPlaylist } from "../../../services/songs";
import { createdPlaylistsShow } from "../../../services/profiles";
import { searchSongs } from "../../../utils/songSearch";

export default function Songs() {
  const { user } = useContext(UserContext);

  // State
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all songs
  useEffect(() => {
    const getAllSongsData = async () => {
      setIsLoading(true);
      try {
        const { data } = await getAllSongs();
        setSongs(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllSongsData();
  }, []);

  const filteredSongs = searchSongs(songs, query);

  // Fetch current login user's playlists
  useEffect(() => {
    if (!user?._id) return;
    const getCreatedPlaylistsData = async () => {
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
      <h1>Explore songs</h1>
      <div>
        <input
          type="text"
          placeholder="Search by title or artist..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div>
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => {
            return (
              <SongItem
                key={song._id}
                song={song}
                songs={songs}
                index={index}
                user={user}
                handleOpenModal={handleOpenModal}
              />
            );
          })
        ) : (
          <p>There are currently no songs to display</p>
        )}
      </div>

      {selectedSong && (
        <AddToPlaylistModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          song={selectedSong}
          playlists={playlists}
          onAdd={addSongToPlaylist}
        />
      )}
    </>
  );
}
