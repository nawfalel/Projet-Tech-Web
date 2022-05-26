import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import authService from '../../services/auth.service';
import { Link } from 'react-router-dom';
import { create_alert_message } from '../../utilities/alerts';


const theme = createTheme();

const SignUpPage = () => {

  const formikRegisterModal = useFormik({
    initialValues: {
        username: '',
        password: ''
    },
    onSubmit: values => {

        authService.register(values)
                   .then(response => {
                      create_alert_message("SUCCESS_ALERT", "Votre compte a été créé avec succès");
                   })
                   .catch(err => create_alert_message("WARNING_ALERT", "Votre compte n'a pas pu être créé"));

    },
  });

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'third.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Création de compte
          </Typography>
          <Box component="form" onSubmit={formikRegisterModal.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              value={formikRegisterModal.values.username}
              onChange={formikRegisterModal.handleChange}
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              value={formikRegisterModal.values.password}
              onChange={formikRegisterModal.handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              color="secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Créer un compte
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signin">
                  {"Vous avez déja un compte, connectez vous!!"}
                </Link>
 
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default SignUpPage;