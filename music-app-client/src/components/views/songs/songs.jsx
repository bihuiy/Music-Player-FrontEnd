import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import "./Songs.css";


// Page components
import ErrorPage from "../ErrorPage/ErrorPage";
import { useParams } from "react-router";
import LoadingPage from "../loadingPage/loadingPage";
import { usePlayer } from "../../../contexts/playerContext";
// * Services / utils
import { getAllSongs, addSongToPlaylist } from "../../../services/songs";
import { createdPlaylistsShow } from "../../../services/profiles";
import { searchSongs } from "../../../utils/songSearch";
// * Page components
import PlayPauseButton from "../../SongPlayPauseButton/PlayPauseButton";
import AddToPlaylistModal from "./AddToPlaylistModal";



export default function Songs() {
  const { user } = useContext(UserContext);

  // State
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [query, setQuery] = useState("");

  // Fetch all songs
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

  const filteredSongs = searchSongs(songs, query);

  // Fetch current login user's playlists
  useEffect(() => {
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
          filteredSongs.map((song, index, songs) => {
            return (
              <div key={song._id}>
                <p>
                  {song.title} by {song.artist}
                </p>
                <button onClick={() => handleOpenModal(song)}>
                  Add to Playlist
                </button>
                <PlayPauseButton song={song} songs={songs} index={index} url={song.url} />
              </div>

            );
          })
        ) : (
          <p>There are currently no songs to display</p>
        )}
      </div>

      {/* Add to Playlist Modal */}
      <div>
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
