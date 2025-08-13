import { useEffect, useState } from "react";
import { likedSongsShow } from "../../../services/profiles";
import "./profile.css";

// Page components
import ErrorPage from "../error-page/error-page";
import { Link, useParams } from "react-router";
import LoadingPage from "../loading-page/loading-page";

export default function LikedSongs() {
  const { userId } = useParams();
  // * State
  const [profileUser, setProfileUser] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
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
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getLikedSongsData();
  }, [userId]);

  if (error) return <ErrorPage error={error} />;
  if (isLoading) return <LoadingPage />;
  if (!profileUser) return <LoadingPage />;

  return (
    <>
      <h1>{`${profileUser.username}`}'s liked songs</h1>
      {/* user's profile photo */}
      <p>{profileUser.username}</p>
      <hr />
      <div>
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
