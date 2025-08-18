import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/user";

export const profileShow = (userId) => {
  return axios.get(`${BASE_URL}/${userId}/profile`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const likedSongsShow = (userId) => {
  return axios.get(`${BASE_URL}/${userId}/liked-songs`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const createdPlaylistsShow = (userId) => {
  return axios.get(`${BASE_URL}/${userId}/created-playlists`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const bookmarkedPlaylistsShow = (userId) => {
  return axios.get(`${BASE_URL}/${userId}/bookmarked-playlists`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
