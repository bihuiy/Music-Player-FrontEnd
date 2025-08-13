import { useEffect, useState } from "react";
import { profileShow } from "../../../services/profiles";
import "./profile.css";

// Page components
import ErrorPage from "../error-page/error-page";
import { Link, useParams } from "react-router";
import LoadingPage from "../loading-page/loading-page";

export default function Profile() {
  const { userId } = useParams();
  // * State
  const [profileUser, setProfileUser] = useState(null);
  const [createdPlaylists, setCreatedPlaylists] = useState([]);
  const [bookmarkedPlaylists, setBookmarkedPlaylists] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
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
        {createdPlaylists.length > 0 ? (
          createdPlaylists.map((createdPlaylist) => {
            return (
              <li key={createdPlaylist._id}>
                <p>{createdPlaylist.title}</p>
              </li>
            );
          })
        ) : (
          <p>There are currently no playlists to display</p>
        )}
      </div>
      <div>
        <Link
          to={`/user/${profileUser._id}/bookmarked-playlists`}
        >{`${profileUser.username}'s bookmarked playlists`}</Link>
        {bookmarkedPlaylists.length > 0 ? (
          bookmarkedPlaylists.map((bookmarkedPlaylist) => {
            return (
              <li key={bookmarkedPlaylist._id}>
                <p>{bookmarkedPlaylist.title}</p>
              </li>
            );
          })
        ) : (
          <p>There are currently no playlists to display</p>
        )}
      </div>
      <div>
        <Link
          to={`/user/${profileUser._id}/liked-songs`}
        >{`${profileUser.username}'s liked songs`}</Link>
        {likedSongs.length > 0 ? (
          likedSongs.map((likedSong) => {
            return (
              <li key={likedSong._id}>
                <p>{likedSong.title}</p>
              </li>
            );
          })
        ) : (
          <p>There are currently no songs to display</p>
        )}
      </div>
    </>
  );
}
