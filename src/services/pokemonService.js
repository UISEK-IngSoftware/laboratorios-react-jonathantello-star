import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchPokemons() {
    const response = await axios.get(`${API_BASE_URL}/pokemons/`);
    return response.data; 
}