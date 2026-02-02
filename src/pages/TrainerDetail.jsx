import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import Spinner from "../components/Spinner"; 
import { fetchTrainerById } from "../services/trainerService";
import './TrainerDetail.css'; 

export default function TrainerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true); 
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;

  useEffect(() => {
    setLoading(true); 
    fetchTrainerById(id)
      .then(setTrainer)
      .catch(console.error)
      .finally(() => setLoading(false)); 
  }, [id]);

  
  if (loading) {
    return <Spinner />;
  }

  
  if (!trainer) return null;

  return (
    <Container maxWidth="md" className="trainer-detail-container">
      {/* Titulo: Nombre y Apellido */}
      <Typography variant="h3" className="trainer-detail-title">
        {trainer.first_name} {trainer.last_name}
      </Typography>
      
      <Typography variant="h5" className="trainer-detail-subtitle">
        Detalles
      </Typography>
      
      {/* Lista de detalles */}
      <Box component="ul" className="trainer-detail-list">
        <li>
          <Typography variant="body1">Nivel: {trainer.level}</Typography>
        </li>
        <li>
          <Typography variant="body1">Fecha de nacimiento: {trainer.birth_date}</Typography>
        </li>
      </Box>

      {/* Imagen del entrenador */}
      <Box>
        <img 
          src={`${mediaUrl}/${trainer.picture}`} 
          alt={trainer.first_name} 
          className="trainer-detail-image"
        />
      </Box>

      <Button 
        variant="contained" 
        onClick={() => navigate("/trainers")} 
        className="btn-trainer-back"
      >
        Volver
      </Button>
    </Container>
  );
}