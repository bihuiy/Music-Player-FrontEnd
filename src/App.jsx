import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";

import Homepage from "./components/Views/Homepage/Homepage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import SignUpPage from "./components/Views/User/Sign-up/Sign-up-page.jsx";
import SignInPage from "./components/Views/User/Sign-in/Sign-in.jsx";
import CreatePlaylist from "./components/Views/Playlists/Create-playlist/Create-playlist.jsx";
import ExplorePlaylists from "./components/Views/Playlists/Explore-playlists/Explore-playlists.jsx";
import Profile from "./components/Views/Profiles/Profile.jsx";
import LikedSongs from "./components/Views/Profiles/Liked-songs.jsx";
import CreatedPlaylists from "./components/Views/Profiles/Created-playlists.jsx";
import BookmarkedPlaylists from "./components/Views/Profiles/Bookmarked-playlists.jsx";
import Songs from "./components/Views/Songs/Songs.jsx";
import ShowPlaylist from "./components/Views/Playlists/Show-playlist/Show-playlist.jsx";
import EditPlaylist from "./components/Views/Playlists/Edit-playlist/Edit-playlist.jsx";
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
