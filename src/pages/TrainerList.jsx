import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Container, Typography, Button, Box } from "@mui/material";
import TrainerCard from "../components/TrainerCard";
import Spinner from "../components/Spinner"; 
import { fetchTrainers, deleteTrainer } from "../services/trainerService";
import './TrainerList.css'; 

export default function TrainerList() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");

  useEffect(() => {
    setLoading(true); 
    fetchTrainers()
      .then(setTrainers)
      .catch(console.error)
      .finally(() => setLoading(false)); 
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este Entrenador?")) {
      try {
        await deleteTrainer(id);
        setTrainers(trainers.filter((t) => t.id !== id));
      } catch (error) {
        console.error("Error al borrar:", error);
      }
    }
  };

  
  if (loading) {
    return <Spinner />;
  }

  return (
    <Container className="trainer-list-container">
      <Typography variant="h4" className="trainer-list-title">
        Entrenadores
      </Typography>

      <Box className="trainer-add-box">
        {isLoggedIn && (
          <Button 
            variant="contained" 
            className="btn-add-trainer"
            onClick={() => navigate("/trainers/add")}
          >
            Añadir Entrenador
          </Button>
        )}
      </Box>

      {/* El Grid maneja la disposición de las tarjetas */}
      <Grid container spacing={3}>
        {trainers.map((trainer) => (
          <Grid key={trainer.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <TrainerCard
              trainer={trainer}
              onDelete={handleDelete}
              onEdit={(id) => navigate(`/trainers/edit/${id}`)}
              onView={(id) => navigate(`/trainers/${id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}