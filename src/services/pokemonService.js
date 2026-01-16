import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchPokemons() {
  const response = await axios.get(`${API_BASE_URL}/pokemons/`);
  return response.data;
}

export async function fetchPokemonById(id) {
  const response = await axios.get(`${API_BASE_URL}/pokemons/${id}/`);
  return response.data;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function addPokemon(pokemonData) {
  let pictureBase64 = "";
  if (pokemonData.picture) {
    pictureBase64 = await fileToBase64(pokemonData.picture);
  }
  const payload = { ...pokemonData, picture: pictureBase64 };
  const response = await axios.post(`${API_BASE_URL}/pokemons/`, payload);
  return response.data;
}

export async function updatePokemon(id, pokemonData) {
  let payload = { ...pokemonData };
  // Si picture es un archivo nuevo convertir
  if (pokemonData.picture && typeof pokemonData.picture !== "string") {
    payload.picture = await fileToBase64(pokemonData.picture);
  }
  const response = await axios.put(`${API_BASE_URL}/pokemons/${id}/`, payload);
  return response.data;
}

export async function deletePokemon(id) {
  const response = await axios.delete(`${API_BASE_URL}/pokemons/${id}/`);
  return response.data;
}