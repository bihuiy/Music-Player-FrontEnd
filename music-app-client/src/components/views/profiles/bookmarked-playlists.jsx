import { useEffect, useState } from "react";
import { bookmarkedPlaylistsShow } from "../../../services/profiles";
import "./profile.css";

// Page components
import ErrorPage from "../error-page/error-page";
import { useParams } from "react-router";
import LoadingPage from "../loading-page/loading-page";

export default function BookmarkedPlaylists() {
  const { userId } = useParams();
  // * State
  const [profileUser, setProfileUser] = useState(null);
  const [bookmarkedPlaylists, setBookmarkedPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBookmarkedPlaylistsData = async () => {
      setIsLoading(true);
      try {
        const { data } = await bookmarkedPlaylistsShow(userId);
        setProfileUser(data.user);
        setBookmarkedPlaylists(data.bookmarkedPlaylists);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getBookmarkedPlaylistsData();
  }, [userId]);

  if (error) return <ErrorPage error={error} />;
  if (isLoading) return <LoadingPage />;
  if (!profileUser) return <LoadingPage />;

  return (
    <>
      <h1>{profileUser.username}'s bookmarked playlists</h1>
      {/* user's profile photo */}
      <p>{profileUser.username}</p>
      <hr />
      <div>
        {bookmarkedPlaylists.length > 0 ? (
          bookmarkedPlaylists.map((bookmarkedPlaylist) => {
            return (
              <div key={bookmarkedPlaylist._id}>
                <p>{bookmarkedPlaylist.title}</p>
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
