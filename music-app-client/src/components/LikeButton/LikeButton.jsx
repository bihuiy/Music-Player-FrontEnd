import { useState } from "react";
import { likeSong, unlikeSong } from "../../services/songs";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useNavigate } from "react-router";

// * Page components
import ErrorPage from "../Views/ErrorPage/ErrorPage";

export default function LikeButton({ song, user }) {
  const [liked, setLiked] = useState(
    user ? song.userLikes.includes(user._id) : false
  );
  const [likesCount, setLikesCount] = useState(song.userLikes.length);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!user?._id) return navigate("/user/sign-up");
    try {
      if (liked) {
        await unlikeSong(song._id, user._id);
        setLiked(false);
        setLikesCount(likesCount - 1);
      } else {
        await likeSong(song._id, user._id);
        setLiked(true);
        setLikesCount(likesCount + 1);
      }
    } catch (error) {
      setError(error);
    }
  };

  if (error) return <ErrorPage error={error} />;

  return (
    <button onClick={handleClick}>
      {liked ? <FcLike /> : <FcLikePlaceholder />} {likesCount}
    </button>
  );
}
