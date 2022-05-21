import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { Router, Route, useNavigate, Outlet } from 'react-router-dom';



const AdminProfile = () => {

    const navigate = useNavigate();

    const goToRecipeMenu = () => navigate("/adminProfile/recipe");
    const goToIngredientMenu = () => navigate("/adminProfile/ingredient");

    const buttons = [
        <Button key="one" variant="contained" color="primary" onClick={goToIngredientMenu}>Ingredients</Button>,
        <Button key="two" variant="contained" color="secondary" onClick={goToRecipeMenu}>List of recipes</Button>
    ];
    return (
        <Container component="main" maxWidth="lg">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            >

                <ButtonGroup size="large" aria-label="large button group">
                    {buttons}
                </ButtonGroup>

            </Box>
            <Box>
                <Outlet />
            </Box>
        </Container>
    )
}

export default AdminProfile;