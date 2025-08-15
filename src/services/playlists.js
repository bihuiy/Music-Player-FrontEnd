import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/playlists";

export const playlistIndex = () => {
  return axios.get(BASE_URL);
};

export const getPlaylist = (id) => {
  return axios.get(BASE_URL + `/${id}`);
};

export const createPlaylist = (formData) => {
  return axios.post(BASE_URL, formData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const editPlaylist = (id, formData) => {
  return axios.put(BASE_URL + `/${id}`, formData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const deletePlaylist = (id) => {
  return axios.delete(BASE_URL + `/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const bookmarkPlaylist = (id) => {
  return axios.post(BASE_URL + `/${id}/bookmark`, null, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const unbookmarkPlaylist = (id) => {
  return axios.delete(BASE_URL + `/${id}/bookmark`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const removeSongFromPlaylist = (id, songId) => {
  return axios.patch(
    BASE_URL + `/${id}/remove-songId`,
    { songId },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
};
