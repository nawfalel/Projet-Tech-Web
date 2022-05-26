import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = (props) => {
    const post = {
        title: "Bienvenue sur Recipe",
        description: "La plateforme qui vous permet de partager vos recettes et de découvrir des nouvelles",
        linkText: "thsi dfd"
    };

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        mt: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url("https://img.cuisineaz.com/2018/05/24/i140192-brochettes-de-saucisses-knacki-au-barbecue.jpeg")`,
      }}
    >
      {/* Increase the priority of the hero background image */}
     
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default HomePage;