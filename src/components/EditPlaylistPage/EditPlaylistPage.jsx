import "./EditPlaylistPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPlaylist } from "../../services/playlists";
import ErrorPage from "../ErrorPage/ErrorPage";
import LoadingPage from "../LoadingPage/LoadingPage";
import EditPlaylistForm from "../EditPlaylistForm/EditPlaylistForm";

const editPlaylist = () => {
  const { playlistId } = useParams();
  // * State
  const [playlist, setPlaylist] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;
  if (!playlist) return <p>Playlist not found :(</p>;

  return (
    <main>
      <h1>Edit {playlist.title}</h1>
      <EditPlaylistForm playlist={playlist} />
    </main>
  );
};

export default editPlaylist;
