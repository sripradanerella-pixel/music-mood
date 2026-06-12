import axios from "axios";

const BASE_URL = "https://music-mood-hvkj.onrender.com";

// SIGNUP
export const signupUser = (data) => {
  return axios.post(`${BASE_URL}/signup`, data);
};

// LOGIN
export const loginUser = (data) => {
  return axios.post(`${BASE_URL}/login`, data);
};

// MOOD SONGS (temporary frontend data or backend later)
export const getSongsByMood = (mood) => {
  return axios.get(`${BASE_URL}/songs/${mood}`);
};