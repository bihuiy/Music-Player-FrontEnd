import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";

import Homepage from "./components/views/Homepage/homepage.jsx";
import Navbar from "./components/Navbar/navbar.jsx";
import SignUpPage from "./components/views/user/sign-up/sign-up-page.jsx";
import SignInPage from "./components/views/user/sign-in/sign-in.jsx";
import CreatePlaylist from "./components/views/playlists/create-playlist/create-playlist.jsx";
import ExplorePlaylists from "./components/views/playlists/explore-playlists/explore-playlists.jsx";
import Profile from "./components/views/profile/profile.jsx";

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
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
