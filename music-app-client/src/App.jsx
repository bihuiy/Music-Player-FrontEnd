import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";


import Homepage from "./components/views/Homepage/homepage.jsx";
import Navbar from "./components/Navbar/navbar.jsx";
import SignUpPage from "./components/views/user/sign-up/sign-up-page.jsx";
import SignInPage from "./components/views/user/sign-in/sign-in.jsx";
import CreatePlaylist from "./components/views/playlists/create-playlist/create-playlist.jsx";
import ExplorePlaylists from "./components/views/playlists/explore-playlists/explore-playlists.jsx";
import Profile from "./components/views/profiles/profile.jsx";
import LikedSongs from "./components/views/profiles/liked-songs.jsx";
import CreatedPlaylists from "./components/views/profiles/created-playlists.jsx";
import BookmarkedPlaylists from "./components/views/profiles/bookmarked-playlists.jsx";
import Songs from "./components/views/songs/songs.jsx";
import ShowPlaylist from './components/views/playlists/show-playlist/show-playlist.jsx'
import EditPlaylist from './components/views/playlists/edit-playlist/edit-playlist.jsx'


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
        <Route path="/playlists/:playlistId" element={<ShowPlaylist/>}/>
        <Route path="/playlists/:playlistId/edit" element={<EditPlaylist/>}/>
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
    </>
  );

}

export default App;
