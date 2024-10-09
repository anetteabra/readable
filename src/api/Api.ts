import axios from "axios";

const API_KEY = "";
const BASE_URL = "https://api";

export const fetchMovies = async () => {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results;
};
