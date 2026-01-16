import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Container, Button, Box, Typography } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import { fetchPokemons, deletePokemon } from "../services/pokemonService";
import './PokemonList.css'; 

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");

  useEffect(() => {
    fetchPokemons().then(setPokemons).catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este Pokémon?")) {
      try {
        await deletePokemon(id);
        setPokemons(pokemons.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error al borrar:", error);
      }
    }
  };

  return (
    <Container className="list-container">
      <Typography variant="h4" className="list-title">
        Pokemons
      </Typography>

      <Box className="add-button-box">
        {isLoggedIn && (
          <Button 
            variant="contained" 
            className="btn-add-pokemon"
            onClick={() => navigate("/pokemon/add")}
          >
            Añadir Pokemon
          </Button>
        )}
      </Box>

      {/* Grid, aqui uso size pq en inspeccionar en la pagina me salio que habian cambiado la forma de funcionar */}
      <Grid container spacing={3}>
        {pokemons.map((pokemon) => (
          <Grid key={pokemon.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <PokemonCard
              pokemon={pokemon}
              onDelete={handleDelete}
              onEdit={(id) => navigate(`/pokemon/edit/${id}`)}
              onView={(id) => navigate(`/pokemon/${id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}