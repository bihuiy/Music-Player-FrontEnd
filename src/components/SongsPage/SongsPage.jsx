import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./SongsPage.css";

// * Page components
import ErrorPage from "../ErrorPage/ErrorPage";
import LoadingPage from "../LoadingPage/LoadingPage";
import SongItem from "../SongItem/SongItem";
import AddToPlaylistWrapper from "../AddToPlaylistWrapper/AddToPlaylistWrapper";

// * Services / utils
import { getAllSongs } from "../../services/songs";
import { searchSongs } from "../../utils/songSearch";

export default function Songs() {
  const { user } = useContext(UserContext);

  // State
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { handleOpenModal, modalComponent } = AddToPlaylistWrapper();

  // Fetch all songs
  useEffect(() => {
    const getAllSongsData = async () => {
      setIsLoading(true);
      try {
        const { data } = await getAllSongs();
        setSongs(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllSongsData();
  }, []);

  const filteredSongs = searchSongs(songs, query);

  if (error) return <ErrorPage error={error} />;
  if (isLoading) return <LoadingPage />;

  return (
    <>
      <h1>Explore songs</h1>
      <div>
        <input
          type="text"
          placeholder="Search by title or artist..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div>
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => {
            return (
              <SongItem
                key={song._id}
                song={song}
                songs={songs}
                index={index}
                user={user}
                handleOpenModal={handleOpenModal}
              />
            );
          })
        ) : (
          <p>There are currently no songs to display</p>
        )}
      </div>

      {modalComponent}
    </>
  );
}
