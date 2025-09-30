import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { likedSongsShow } from "../../services/profiles";
import "../ProfilePage/ProfilePage.css";

// Page components
import ErrorPage from "../ErrorPage/ErrorPage";
import { useParams } from "react-router";
import LoadingPage from "../LoadingPage/LoadingPage";
import SongItem from "../SongItem/SongItem";
import AddToPlaylistWrapper from "../AddToPlaylistWrapper/AddToPlaylistWrapper";

export default function LikedSongs() {
  const { userId } = useParams();
  const { user } = useContext(UserContext);

  // * State
  const [profileUser, setProfileUser] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { handleOpenModal, modalComponent } = AddToPlaylistWrapper();

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

  if (error) return <ErrorPage error={error} />;
  if (isLoading) return <LoadingPage />;
  if (!profileUser) return <LoadingPage />;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={profileUser.profileImage}
          alt={`${profileUser.username}'s avatar`}
          className="profile-avatar"
        />
        <h1>{profileUser.username}'s liked songs</h1>
        <hr />
      </div>
      <div className="subsection">
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
        {modalComponent}
      </div>
    </div>
  );
}
