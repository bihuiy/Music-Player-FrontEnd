import "./App.css";
import { Routes, Route } from "react-router";

import Homepage from "./components/Homepage/Homepage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import SignUpPage from "./components/SignUpPage/SignUpPage.jsx";
import SignInPage from "./components/SignInPage/SignInPage.jsx";
import CreatePlaylistPage from "./components/CreatePlaylistPage/CreatePlaylistPage.jsx";
import ExplorePlaylistsPage from "./components/ExplorePlaylistsPage/ExplorePlaylistsPage.jsx";
import ProfilePage from "./components/ProfilePage/ProfilePage.jsx";
import LikedSongsPage from "./components/LikedSongsPage/LikedSongsPage.jsx";
import CreatedPlaylistsPage from "./components/CreatedPlaylistsPage/CreatedPlaylistsPage.jsx";
import BookmarkedPlaylistsPage from "./components/BookmarkedPlaylistsPage/BookmarkedPlaylistsPage.jsx";
import SongsPage from "./components/SongsPage/SongsPage.jsx";
import ShowPlaylistPage from "./components/ShowPlaylistPage/ShowPlaylistPage.jsx";
import EditPlaylistPage from "./components/EditPlaylistPage/EditPlaylistPage.jsx";
import Player from "./components/Player/Player.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/user/sign-up" element={<SignUpPage />} />
        <Route path="/user/sign-in" element={<SignInPage />} />
        <Route
          path="/playlists/create-playlist"
          element={<CreatePlaylistPage />}
        />
        <Route path="/playlists" element={<ExplorePlaylistsPage />} />
        <Route path="/playlists/:playlistId" element={<ShowPlaylistPage />} />
        <Route
          path="/playlists/:playlistId/edit"
          element={<EditPlaylistPage />}
        />
        <Route path="/user/:userId/profile" element={<ProfilePage />} />
        <Route
          path="/user/:userId/created-playlists"
          element={<CreatedPlaylistsPage />}
        />
        <Route
          path="/user/:userId/bookmarked-playlists"
          element={<BookmarkedPlaylistsPage />}
        />
        <Route path="/user/:userId/liked-songs" element={<LikedSongsPage />} />
        <Route path="/songs" element={<SongsPage />} />
      </Routes>
      <Player />
    </>
  );
}

export default App;
