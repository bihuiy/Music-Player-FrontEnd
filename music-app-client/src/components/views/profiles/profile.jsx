import { useEffect, useState } from "react";
import { profileShow } from "../../../services/profiles";
import "./Profile.css";
import "../playlists/explore-playlists/explore-playlists.css";
import { UserContext } from "../../../contexts/UserContext";
import { useContext } from "react";


// Page components
import ErrorPage from "../ErrorPage/ErrorPage";
import { Link, useParams } from "react-router";
import LoadingPage from "../LoadingPage/LoadingPage";
import SongItem from "../Songs/SongItem";
import AddToPlaylistModal from "../Songs/AddToPlaylistModal";
import { addSongToPlaylist } from "../../../services/songs";
import { createdPlaylistsShow } from "../../../services/profiles";
import PlaylistTile from "../../Playlist-tile/Playlist-tile";

export default function Profile() {
  const { userId } = useParams();
  const {user} = useContext(UserContext)
  // * State
  const [profileUser, setProfileUser] = useState(null);
  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [bookmarkedPlaylists, setBookmarkedPlaylists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    const getProfileData = async () => {
      setIsLoading(true);
      try {
        const { data } = await profileShow(userId);
        setProfileUser(data.user);
        setCreatedPlaylists(data.createdPlaylists);
        setBookmarkedPlaylists(data.bookmarkedPlaylists);
        setLikedSongs(data.likedSongs);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getProfileData();
  }, [userId]);

  // Fetch current login user's playlists
  useEffect(() => {
    const getCreatedPlaylistsData = async () => {
      try {
        const { data } = await createdPlaylistsShow(user._id);
        setCreatedPlaylists(data.createdPlaylists);
      } catch (error) {
        console.log(error)
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
    <>
      <h1>{`${profileUser.username}`}'s profile</h1>
      {/* user's profile photo */}
      <p>{profileUser.username}</p>
      <hr />
      <div>
        <Link
          to={`/user/${profileUser._id}/created-playlists`}
          
        >{`${profileUser.username}'s playlists`}</Link>
        <div className="playlists-grid">
          {createdPlaylists.length > 0 ? (
          createdPlaylists.map((playlist) => {
            return (
              <div key={playlist._id} className="playlistTile">
                <PlaylistTile playlist={playlist} />
              </div>
            );
          })
        ) : (
          <p>There are currently no playlists to display</p>
        )}
        </div>
        
      </div>
      <div>
        <Link
          to={`/user/${profileUser._id}/bookmarked-playlists`}
        >{`${profileUser.username}'s bookmarked playlists`}</Link>
        <div className="playlists-grid">
          {bookmarkedPlaylists.length > 0 ? (
          bookmarkedPlaylists.map((playlist) => {
            return (
              <div key={playlist._id} className="playlistTile">
                <PlaylistTile playlist={playlist} />
              </div>
            );
          })
        ) : (
          <p>There are currently no playlists to display</p>
        )}
        </div>
        
      </div>
      <div>
        <Link
          to={`/user/${profileUser._id}/liked-songs`}
        >{`${profileUser.username}'s liked songs`}</Link>
        {likedSongs.length > 0 ? (
          likedSongs.map((song, index) => {
            return (
              <SongItem
                key={song._id}
                song={song}
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
    </>
  );
}
