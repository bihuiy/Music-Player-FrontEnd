import { useEffect, useState } from "react";
import "./homepage.css";
import { homePage } from "../../../services/homepage";

export default function Homepage() {
  // * State
  const [topPlaylists, setTopPlaylists] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHomepageData = async () => {
      try {
        const { data } = await homePage();
        setTopPlaylists(data.topPlaylists);
        setTopSongs(data.topSongs);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    getHomepageData();
  }, []);

  if (error) return <ErrorPage error={error} />;

  return (
    <>
      <h1>Music Player Homepage</h1>
      <h2>Check out our top playlists:</h2>
      <ul>
        {topPlaylists.map((playlist) => (
          <li key={playlist._id}>
            <img src={playlist.coverArt} alt={`${playlist.title} cover`} />
            <p>
              {playlist.title} created by:{" "}
              {playlist.owner?.username || "Unknown"}
            </p>
          </li>
        ))}
      </ul>
      <h2>Check out our top songs:</h2>
      <ul>
        {topSongs.map((song) => (
          <li key={song._id}>
            {song.title} by {song.artist}
          </li>
        ))}
      </ul>
    </>
  );
}
