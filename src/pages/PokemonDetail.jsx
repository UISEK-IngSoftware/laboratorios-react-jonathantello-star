import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import { fetchPokemonById } from "../services/pokemonService";
import './PokemonDetail.css'; 

export default function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;

  useEffect(() => {
    fetchPokemonById(id).then(setPokemon).catch(console.error);
  }, [id]);

  if (!pokemon) return (
    <Container className="detail-container">
      <Typography>Cargando detalles...</Typography>
    </Container>
  );

  return (
    <Container maxWidth="md" className="detail-container">
      {/* Titulo principal */}
      <Typography variant="h3" className="detail-title">
        {pokemon.name}
      </Typography>
      
      <Typography variant="h5" className="detail-subtitle">
        Detalles
      </Typography>
      
      {/* Lista de detalles */}
      <Box component="ul" className="detail-list">
        <li>
          <Typography variant="body1"><strong>Tipo:</strong> {pokemon.type}</Typography>
        </li>
        <li>
          <Typography variant="body1"><strong>Altura:</strong> {pokemon.height} m</Typography>
        </li>
        <li>
          <Typography variant="body1"><strong>Peso:</strong> {pokemon.weight} kg</Typography>
        </li>
      </Box>

      {/* Imagen */}
      <Box className="detail-image-box">
        <img 
          src={`${mediaUrl}/${pokemon.picture}`} 
          alt={pokemon.name} 
          className="detail-image"
        />
      </Box>

      {/* Botón de volver */}
      <Button 
        variant="contained" 
        onClick={() => navigate("/")} 
        className="btn-back"
      >
        Volver
      </Button>
    </Container>
  );
}