import { Card, CardActions, CardMedia, CardContent, Typography, Stack, IconButton, Divider } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './TrainerCard.css'; 

export default function TrainerCard({ trainer, onDelete, onEdit, onView }) {
  const mediaUrl = import.meta.env.VITE_MEDIA_URL;
  const isLoggedIn = !!localStorage.getItem("access_token");
  const imageUrl = `${mediaUrl}/${trainer.picture}`; 

  return (
    <Card className="trainer-card">
      <CardMedia
        component="img"
        height={220}
        image={imageUrl}
        alt={`${trainer.first_name} ${trainer.last_name}`}
        className="trainer-card-media"
      />
      
      <CardContent className="trainer-card-content">
        <Typography variant="h5" className="trainer-card-name">
            {trainer.first_name} {trainer.last_name}
        </Typography>

        <Divider className="trainer-divider" />

        <Typography variant="body1">
            <strong>Nivel:</strong> {trainer.level}
        </Typography>

        <Typography variant="body2" color="text.secondary" className="trainer-birthdate">
            <strong>Fecha de nacimiento:</strong> {trainer.birth_date}
        </Typography>
      </CardContent>

      <CardActions className="trainer-card-actions">
        <Stack direction="row" spacing={1}>
          <IconButton 
            onClick={() => onView(trainer.id)} 
            className="btn-square btn-view"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>

          {isLoggedIn && (
            <>
              <IconButton 
                onClick={() => onEdit(trainer.id)} 
                className="btn-square btn-edit"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                onClick={() => onDelete(trainer.id)} 
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