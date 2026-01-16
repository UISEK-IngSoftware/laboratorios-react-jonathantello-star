import { Card, CardActions, CardMedia, CardContent, Typography, Stack, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './PokemonCard.css'; 

export default function PokemonCard({ pokemon, onDelete, onEdit, onView }) {
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;
  const isLoggedIn = !!localStorage.getItem("access_token");
  const imageUrl = `${mediaUrl}/${pokemon.picture}`;

  return (
    <Card className="pokemon-card">
      <CardMedia 
        component="img" 
        height={200} 
        image={imageUrl} 
        alt={pokemon.name} 
      />
      <CardContent className="pokemon-card-content">
        <Typography variant="h5" className="pokemon-card-title">
          {pokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tipo: {pokemon.type}
        </Typography>
      </CardContent>

      <CardActions className="pokemon-card-actions">
        {/* aqui le pongo direction row y spacing 1 */}
        <Stack direction="row" spacing={1}>
          <IconButton 
            onClick={() => onView(pokemon.id)} 
            className="btn-square btn-view"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>

          {isLoggedIn && (
            <>
              <IconButton 
                onClick={() => onEdit(pokemon.id)} 
                className="btn-square btn-edit"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => onDelete(pokemon.id)} 
                className="btn-square btn-delete"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}