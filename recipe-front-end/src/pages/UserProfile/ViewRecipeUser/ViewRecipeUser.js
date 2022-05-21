import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Pagination, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import userService from '../../../services/user.service';
import { initialize_list_of_ingredients_user } from '../../../redux/action-creators/user_operation';
import { useNavigate } from 'react-router-dom';

const ViewRecipeUser = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        userService.getRecipesUser()
                    .then(response => {
                        console.log(`resp: ${JSON.stringify(response.data)}`)
                        props.initialize_list_of_recipes_user(response.data);
                    })
                    .catch(error => console.log(`error: ${error}`));
    }, []);

    const deleteRecipeFromList = (recipeId) => {
        userService.deleteRecipesUser(recipeId)
                    .then(response => {
                        props.delete_recipe_from_list_of_recipes(recipeId);
                    })
    }

    return (
        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
            <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center"
                rowSpacing={2}
                spacing={0}>
                {props.recipesListUserReducer.map(recipe =>
                    <Grid item xs={12} mb={4}>
                        <Card>
                            <Grid container direction="row" justifyContent="center" alignItems='center'>
                                <Grid item xs={6}>

                                    <Stack spacing={2} justifyContent="center" alignItems='center' xs={12} md={6}>
                                        <Typography component="h5" variant="h5">
                                            {recipe.label}
                                        </Typography>
                                        <Stack direction="row" spacing={2} alignItems='center' xs={12} md={6}>
                                            <Button color="primary" variant="contained"
                                                onClick={() => navigate(`/userProfile/seerecipedetails/${recipe.id}`)}>
                                                Voir détail
                                            </Button>
                                            <Button color="secondary" variant="contained"
                                                onClick={() => deleteRecipeFromList(recipe.id)}>
                                                Supprimer
                                            </Button>
                                        </Stack>

                                    </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 200,
                                            width: 400,
                                            maxHeight: { xs: 200, md: 200 },
                                            maxWidth: { xs: 400, md: 400 },
                                        }}
                                        src={recipe.imageUrl}
                                    />
                                </Grid>

                            </Grid>
                        </Card>
                    </Grid>
                )}


            </Grid>

            <Pagination count={10} page={null} onChange={null} />
            
        </Stack>
    );
}

export default ViewRecipeUser;