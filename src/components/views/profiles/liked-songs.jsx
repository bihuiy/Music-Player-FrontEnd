import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { likedSongsShow } from "../../../services/profiles";
import "./Profile.css";

// Page components
import ErrorPage from "../ErrorPage/ErrorPage";
import { useParams } from "react-router";
import LoadingPage from "../LoadingPage/LoadingPage";
import SongItem from "../Songs/SongItem";
import AddToPlaylistModal from "../Songs/AddToPlaylistModal";
import { addSongToPlaylist } from "../../../services/songs";
import { createdPlaylistsShow } from "../../../services/profiles";

export default function LikedSongs() {
  const { userId } = useParams();
  const { user } = useContext(UserContext);

  // * State
  const [profileUser, setProfileUser] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLikedSongsData = async () => {
      setIsLoading(true);
      try {
        const { data } = await likedSongsShow(userId);
        setProfileUser(data.user);
        setLikedSongs(data.likedSongs);
      } catch (error) {
        console.log(error);
        
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getLikedSongsData();
  }, [userId]);

  // Fetch current login user's playlists
  useEffect(() => {
    const getCreatedPlaylistsData = async () => {
      try {
        const { data } = await createdPlaylistsShow(user._id);
        setPlaylists(data.createdPlaylists);
      } catch (error) {
        console.log(error);
        
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
  if (!profileUser) return <LoadingPage />;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{profileUser.username}'s liked songs</h1>
        <hr />
      </div>
      <div>
        {likedSongs.length > 0 ? (
          likedSongs.map((likedSong, index) => {
            return (
              <SongItem
                key={likedSong._id}
                song={likedSong}
                songs={likedSongs}
                index={index}
                user={user}
                handleOpenModal={handleOpenModal}
              />
            );
          })
        ) : (
          <p>There are currently no songs to display</p>
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
    </div>
  );
}
