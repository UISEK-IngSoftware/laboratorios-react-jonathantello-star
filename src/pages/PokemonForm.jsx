import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import { fetchPokemonById, addPokemon, updatePokemon } from "../services/pokemonService";
import './PokemonForm.css'; 

export default function PokemonForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    weight: "",
    height: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (isEdit) {
      fetchPokemonById(id).then((data) => {
        setFormData({
          name: data.name,
          type: data.type,
          weight: data.weight || "",
          height: data.height || "",
        });
      }).catch(console.error);
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      name: formData.name,
      type: formData.type,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      height: formData.height ? parseFloat(formData.height) : null,
      picture: file 
    };

    try {
      if (isEdit) {
        await updatePokemon(id, dataToSend);
        alert("Pokémon actualizado correctamente");
      } else {
        await addPokemon(dataToSend);
        alert("Pokémon creado correctamente");
      }
      navigate("/");
    } catch (error) {
      console.error("Error detallado:", error.response?.data || error);
      alert("Error al guardar.");
    }
  };

  return (
    <Container maxWidth="sm" className="form-container">
      <Paper elevation={3} className="form-paper">
        <Typography variant="h5" className="form-title">
          {isEdit ? "Editar Pokémon" : "Nuevo Pokémon"}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} className="form-grid">
          <TextField 
            label="Nombre del Pokémon" 
            fullWidth 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <TextField 
            label="Tipo (Fuego, Agua, etc.)" 
            fullWidth 
            value={formData.type} 
            onChange={(e) => setFormData({...formData, type: e.target.value})} 
            required 
          />
          
          <Box className="form-row">
            <TextField 
              label="Peso (kg)" 
              type="number" 
              inputProps={{ step: "0.1" }}
              fullWidth 
              value={formData.weight} 
              onChange={(e) => setFormData({...formData, weight: e.target.value})} 
            />
            <TextField 
              label="Altura (m)" 
              type="number" 
              inputProps={{ step: "0.1" }}
              fullWidth 
              value={formData.height} 
              onChange={(e) => setFormData({...formData, height: e.target.value})} 
            />
          </Box>
          
          <Box className="upload-area">
            <Typography variant="caption" display="block" className="upload-caption">
              Imagen del Pokémon
            </Typography>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])} 
            />
          </Box>

          <Box className="button-group">
            <Button 
                type="submit" 
                variant="contained" 
                fullWidth
                className="btn-submit"
            >
              {isEdit ? "Actualizar" : "Guardar"}
            </Button>
            <Button 
                onClick={() => navigate("/")} 
                variant="outlined" 
                fullWidth
                color="inherit"
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}