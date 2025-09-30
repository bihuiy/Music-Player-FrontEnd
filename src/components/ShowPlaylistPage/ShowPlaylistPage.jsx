import "./ShowPlaylistPage.css";
import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { deletePlaylist, getPlaylist } from "../../services/playlists";
import { UserContext } from "../../contexts/UserContext";

// * Page components
import LoadingPage from "../LoadingPage/LoadingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import SongItem from "../SongItem/SongItem";
import { CiCirclePlus } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import BookmarkButton from "../BookmarkButton/BookmarkButton";
import AddToPlaylistWrapper from "../AddToPlaylistWrapper/AddToPlaylistWrapper";

// * Services / utils
import { removeSongFromPlaylist } from "../../services/playlists";

const ShowPlaylist = () => {
  const { playlistId } = useParams();
  // * State
  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { handleOpenModal, modalComponent } = AddToPlaylistWrapper();

  // * Context
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getPlaylistData = async () => {
      setIsLoading(true);
      try {
        const { data } = await getPlaylist(playlistId);
        setPlaylist(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPlaylistData();
  }, [playlistId]);

  const handleDelete = async () => {
    try {
      await deletePlaylist(playlistId);
      navigate("/playlists");
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteSong = async (songId) => {
    try {
      await removeSongFromPlaylist(playlistId, songId);
      const { data } = await getPlaylist(playlistId);
      setPlaylist(data);
    } catch (error) {
      setError(error);
    }
  };

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;
  if (!playlist) return <p>Playlist not found :(</p>;

  const isOwner = user?._id === playlist.owner?._id;

  return (
    <main className="showPlaylistPage">
      <div className="playlistHead">
        <div className="coverArtWrapper">
          {isOwner && <BookmarkButton playlist={playlist} />}
          {playlist.coverArt ? (
            <img
              className="coverArt"
              src={playlist.coverArt}
              alt={`${playlist.title} cover`}
            />
          ) : (
            <img
              className="coverArt"
              src={
                "https://res.cloudinary.com/dhdhyhahn/image/upload/v1755012671/5b3d5b19-045d-486b-822e-e8bc5fe8c16c.png"
              }
              alt={`${playlist.title} cover`}
            />
          )}
        </div>

        <div className="playlistInfo">
          <h1>{playlist.title}</h1>
          <h2>Created by {playlist.owner.username}</h2>
          {isOwner && (
            <div className="playlistOptions">
              <button
                className="editButton"
                onClick={() => navigate(`/playlists/${playlist._id}/edit`)}
              >
                Edit Playlist
              </button>
              <button className="deleteButton" onClick={handleDelete}>
                Delete Playlist
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="songSection">
        {playlist.songs.length > 0 ? (
          playlist.songs.map((song, index) => {
            return (
              <div key={song._id} className="song-row">
                <SongItem
                  song={song}
                  songs={playlist.songs}
                  index={index}
                  user={user}
                  handleOpenModal={handleOpenModal}
                />

                {user?._id && user._id === playlist.owner._id && (
                  <button
                    className="delete-song-button"
                    onClick={() => handleDeleteSong(song._id)}
                  >
                    <MdDeleteOutline />
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div>
            <p>There are currently no songs to display</p>
            {user?._id && user._id === playlist.owner._id && (
              <Link to={`/songs`}>
                <CiCirclePlus className="add-song-icon" />
              </Link>
            )}
          </div>
        )}
        {modalComponent}
      </div>
    </main>
  );
};

export default ShowPlaylist;
