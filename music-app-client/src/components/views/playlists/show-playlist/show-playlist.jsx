import "./Show-playlist.css";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { deletePlaylist, getPlaylist } from "../../../../services/playlists";

import LoadingPage from "../../LoadingPage/LoadingPage";
import { UserContext } from "../../../../contexts/UserContext";
import ErrorPage from "../../ErrorPage/ErrorPage";

const ShowPlaylist = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
      console.log(error);
    }
  };

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;
  if (!playlist) return <p>Playlist not found :(</p>;

  const isOwner = user._id === playlist.owner._id;

  return (
    <main>
      <div className="playlistHead">
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
        <div className="playlistInfo">
          <h1>{playlist.title}</h1>
          <h2>Created by {playlist.owner.username}</h2>
          {isOwner && (
            <>
              <button
                className="editButton"
                onClick={() => navigate(`/playlists/${playlist._id}/edit`)}
              >
                Edit Playlist
              </button>
              <button className="deleteButton" onClick={handleDelete}>
                Delete Playlist
              </button>
            </>
          )}
        </div>
      </div>

      {playlist.songs.length > 0 ? (
        <ul>
          {playlist.songs.map((song) => {
            return (
              <li key={song._id}>
                {song.title} {song.artist ? `by ${song.artist}` : ""}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Playlist is empty</p>
      )}
    </main>
  );
};

export default ShowPlaylist;
