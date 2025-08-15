import { Link } from "react-router";
import "../Navbar/Navbar.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import { removeToken } from "../../utils/auth";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
    removeToken();
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="HomeLink">
        <Link to="/">Home</Link>
      </div>
      <div className="links">
        <Link to="/playlists">Explore Playlists</Link>
        <Link to="/songs">Explore Songs</Link>
        {user ? (
          <>
            <Link to="/playlists/create-playlist">Create a Playlist</Link>
            <button
              type="button"
              className="signout-btn"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            <Link to={`/user/${user._id}/profile`}>{`${user.username}`}</Link>
          </>
        ) : (
          <>
            <Link to="/user/sign-up">sign-up</Link>
            <Link to="/user/sign-in">sign-in</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
