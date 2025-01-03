import axios from "axios";

const API_URL = "https://netflix-titles-api-tpik.onrender.com/api/titles";

export const getTitles = async (page, limit, sortBy, order, type) => {
  const response = await axios.get(API_URL, {
    params: { page, limit, sortBy, order, type },
  });
  return response.data;
};

export const getBestRatedTitles = async (limit) => {
  const response = await axios.get(`${API_URL}/best-rated`, {
    params: { limit },
  });
  return response.data;
};

export const searchTitles = async (query) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { query },
  });
  return response.data;
};
