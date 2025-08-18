import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";

import Homepage from "./components/views/Homepage/Homepage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import SignUpPage from "./components/views/User/SignUp/SignUp.jsx";
import SignInPage from "./components/views/User/SignIn/SignIn.jsx";
import CreatePlaylist from "./components/views/Playlists/CreatePlaylist/CreatePlaylist.jsx";
import ExplorePlaylists from "./components/views/Playlists/ExplorePlaylists/ExplorePlaylists.jsx";
import Profile from "./components/views/Profiles/Profilee.jsx";
import LikedSongs from "./components/views/Profiles/LikedSongs.jsx";
import CreatedPlaylists from "./components/views/Profiles/CreatedPlaylists.jsx";
import BookmarkedPlaylists from "./components/views/Profiles/BookmarkedPlaylists.jsx";
import Songs from "./components/views/Songs/Songs.jsx";
import ShowPlaylist from "./components/views/Playlists/ShowPlaylist/ShowPlaylist.jsx";
import EditPlaylist from "./components/views/Playlists/EditPlaylist/EditPlaylist.jsx";
import Player from "./components/Player/Player.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/user/sign-up" element={<SignUpPage />} />
        <Route path="/user/sign-in" element={<SignInPage />} />
        <Route path="/playlists/create-playlist" element={<CreatePlaylist />} />
        <Route path="/playlists" element={<ExplorePlaylists />} />
        <Route path="/playlists/:playlistId" element={<ShowPlaylist />} />
        <Route path="/playlists/:playlistId/edit" element={<EditPlaylist />} />
        <Route path="/user/:userId/profile" element={<Profile />} />
        <Route
          path="/user/:userId/created-playlists"
          element={<CreatedPlaylists />}
        />
        <Route
          path="/user/:userId/bookmarked-playlists"
          element={<BookmarkedPlaylists />}
        />
        <Route path="/user/:userId/liked-songs" element={<LikedSongs />} />
        <Route path="/songs" element={<Songs />} />
      </Routes>
      <Player />
    </>
  );
}

export default App;
