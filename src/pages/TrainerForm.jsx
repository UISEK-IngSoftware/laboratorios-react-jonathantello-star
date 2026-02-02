import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import Spinner from "../components/Spinner"; 
import { fetchTrainerById, addTrainer, updateTrainer } from "../services/trainerService";
import './TrainerForm.css'; 

export default function TrainerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    level: "",
    birth_date: "",
  });
  const [file, setFile] = useState(null);
  
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      fetchTrainerById(id).then((data) => {
        setFormData({
          first_name: data.first_name,
          last_name: data.last_name,
          level: data.level,
          birth_date: data.birth_date,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false)); 
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const dataToSend = {
      ...formData,
      level: parseInt(formData.level),
      picture: file 
    };

    try {
      if (isEdit) {
        await updateTrainer(id, dataToSend);
        alert("Entrenador actualizado");
      } else {
        await addTrainer(dataToSend);
        alert("Entrenador creado");
      }
      navigate("/trainers");
    } catch (error) {
      console.error("Error al guardar:", error.response?.data || error);
      alert("Error al guardar. Revisa que los campos sean correctos.");
    } finally {
      setLoading(false); 
    }
  };

  
  if (loading) {
    return <Spinner />;
  }

  return (
    <Container maxWidth="sm" className="trainer-form-container">
      <Paper elevation={3} className="trainer-form-paper">
        <Typography variant="h5" className="trainer-form-title">
          {isEdit ? "Editar Entrenador" : "Nuevo Entrenador"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} className="trainer-form-grid">
          <TextField 
            label="Nombre" 
            fullWidth 
            required
            value={formData.first_name} 
            onChange={(e) => setFormData({...formData, first_name: e.target.value})} 
          />
          
          <TextField 
            label="Apellido" 
            fullWidth 
            required
            value={formData.last_name} 
            onChange={(e) => setFormData({...formData, last_name: e.target.value})} 
          />

          <TextField 
            label="Nivel" 
            type="number"
            fullWidth 
            required
            value={formData.level} 
            onChange={(e) => setFormData({...formData, level: e.target.value})} 
          />

          <TextField 
            label="Fecha de Nacimiento" 
            type="date"
            fullWidth 
            required
            InputLabelProps={{ shrink: true }}
            value={formData.birth_date} 
            onChange={(e) => setFormData({...formData, birth_date: e.target.value})} 
          />

          <Box className="trainer-photo-box">
            <Typography variant="caption" display="block" className="trainer-photo-caption">
              Foto del Entrenador
            </Typography>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          </Box>

          <Box className="trainer-form-buttons">
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              className="btn-save-trainer"
            >
              Guardar
            </Button>
            <Button 
              onClick={() => navigate("/trainers")} 
              variant="outlined" 
              fullWidth
              color="inherit"
              className="btn-cancel-trainer"
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}