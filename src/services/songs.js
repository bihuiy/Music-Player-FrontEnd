import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/songs";

export const getAllSongs = () => {
  return axios.get(BASE_URL);
};

export const likeSong = (songId) => {
  return axios.put(
    `${BASE_URL}/${songId}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const unlikeSong = (songId) => {
  return axios.delete(`${BASE_URL}/${songId}/like`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const addSongToPlaylist = (songId, playlistId) => {
  return axios.post(
    `${BASE_URL}/${songId}/add-to-playlist`,
    { playlistId },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};
