import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Profile.css";

// * Services
import { bookmarkedPlaylistsShow } from "../../../services/profiles";

// * Page components
import ErrorPage from "../ErrorPage/ErrorPage";
import LoadingPage from "../LoadingPage/LoadingPage";

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
