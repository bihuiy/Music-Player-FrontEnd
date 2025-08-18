import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { UserProvider } from "./contexts/UserContext.jsx";
import { AudioPlayerProvider } from "react-use-audio-player";
import { PlayerProvider } from "./contexts/PlayerContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AudioPlayerProvider>
          <PlayerProvider>
            <App />
          </PlayerProvider>
        </AudioPlayerProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
