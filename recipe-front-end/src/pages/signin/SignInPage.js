import * as React from 'react';
import { useEffect} from "react";
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
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

const theme = createTheme();

const SignInPage = (props) => {

  const navigate = useNavigate();

  const formikSignInModal = useFormik({
    initialValues: {
        username: '',
        password: ''
    },
    onSubmit: values => {

        authService.login(values)
                   .then(response => {

                      if (response.data.authenticationToken) {
                        authService.saveUserDataInLocalStorage(response.data);
                      setTimeout(() => {
                        if(response.data.roles.includes("ROLE_ADMIN"))
                        navigate("/adminProfile/ingredient");
                        else
                          navigate("/userProfile/viewrecipe")
                      },50);
                      
                     }
                     
                   })
                   .catch(err => console.log(`The credentials aren't correct`));

    },
  });


  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box component="form" onSubmit={formikSignInModal.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              value={formikSignInModal.values.username}
              onChange={formikSignInModal.handleChange}
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
              value={formikSignInModal.values.password}
              onChange={formikSignInModal.handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup">
                  {"Vous n'avez pas de compte, créez en un !!"}
              </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignInPage;