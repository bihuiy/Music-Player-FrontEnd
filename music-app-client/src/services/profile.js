import axios from "axios";
import { getToken } from "../utils/auth";

const BASE_URL = import.meta.env.VITE_API_URL + "/profile";

const profileShow = (userId) => {
  return axios.get(`${BASE_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export default profileShow;
