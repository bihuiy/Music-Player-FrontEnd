import { useEffect, useState } from "react";
import { createdPlaylistsShow } from "../../../services/profiles";
import "./profile.css";

// Page components
import ErrorPage from "../error-page/error-page";
import { useParams } from "react-router";
import LoadingPage from "../loading-page/loading-page";

export default function CreatedPlaylists() {
  const { userId } = useParams();
  // * State
  const [profileUser, setProfileUser] = useState(null);
  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCreatedPlaylistsData = async () => {
      setIsLoading(true);
      try {
        const { data } = await createdPlaylistsShow(userId);
        setProfileUser(data.user);
        setCreatedPlaylists(data.createdPlaylists);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCreatedPlaylistsData();
  }, [userId]);

  if (error) return <ErrorPage error={error} />;
  if (isLoading) return <LoadingPage />;
  if (!profileUser) return <LoadingPage />;

  return (
    <>
      <h1>{profileUser.username}'s created playlists</h1>
      {/* user's profile photo */}
      <p>{profileUser.username}</p>
      <hr />
      <div>
        {createdPlaylists.length > 0 ? (
          createdPlaylists.map((createdPlaylist) => {
            return (
              <div key={createdPlaylist._id}>
                <p>{createdPlaylist.title}</p>
              </div>
            );
          })
        ) : (
          <p>There are currently no playlists to display</p>
        )}
      </div>
    </>
  );
}
