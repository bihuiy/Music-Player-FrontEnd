import { useEffect, useState } from "react";
import { getAllSongs, addSongToPlaylist } from "../../../services/songs";
import { useAudioPlayerContext } from "react-use-audio-player";
import { createdPlaylistsShow } from "../../../services/profiles";
import AddToPlaylistModal from "./AddToPlaylistModal";
import "./songs.css";

// * Page components
import ErrorPage from "../error-page/error-page";
import LoadingPage from "../loading-page/loading-page";
import { useParams } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../../contexts/userContext";

// * Play/Pause button components
function PlayPauseButton({ song, url }) {
  const { load, togglePlayPause, isPaused, isPlaying, src } =
    useAudioPlayerContext();

  // Handle play/pause button click
  function handlePlayButton() {
    if (src === url) {
      // If the same song is currently loaded, toggle play/pause
      return togglePlayPause();
    } // else, load the new song and autoplay
    load(url, {
      autoplay: true,
    });
  }

  return (
    <button onClick={handlePlayButton}>
      {isPlaying && src === url ? "Pause" : "Play"}
    </button>
  );
}

export default function Songs() {
  // get the current login user details
  const { user } = useContext(UserContext);
  // get the userId from url
  const { userId: urlUserId } = useParams();
  // * State
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlists, setPlaylists] = useState([]);

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

  // Fetch current login user's playlists
  useEffect(() => {
    const getCreatedPlaylistsData = async () => {
      try {
        const { data } = await createdPlaylistsShow(user._id);
        setPlaylists(data.createdPlaylists);
      } catch (error) {
        console.log(`Fetch current login user's playlists: ${error}`);

        setError(error);
      }
    };
    getCreatedPlaylistsData();
  }, [urlUserId]);

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
        {songs.length > 0 ? (
          songs.map((song) => {
            return (
              <div key={song._id}>
                <p>{song.title}</p>
                <button onClick={() => handleOpenModal(song)}>
                  Add to Playlist
                </button>
                <PlayPauseButton song={song} url={song.url} />
              </div>
            );
          })
        ) : (
          <p>There are currently no songs to display</p>
        )}
      </div>

      {/* Add to Playlist Modal */}
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
