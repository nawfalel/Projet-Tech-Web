import { useState, useMemo } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Pagination, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../../services/user.service';
import { create_alert_message } from '../../../utilities/alerts';

const ViewAllRecipes = (props) => {

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);

    const [allRecipes, setAllRecipes] = useState([]);

    const pageSize = 3;

    //Will recompute only if dependency changes
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        return allRecipes.slice(firstPageIndex, lastPageIndex);
    }, [allRecipes, currentPage]);

    useEffect(() => {
        userService.getFavoriteRecipes()
            .then(response => {
                props.initialize_list_of_favorite_recipes(response.data.reverse());

                userService.getAllRecipes()
                    .then(response => {
                        props.initialize_all_recipes_admin(response.data.reverse());
                        setAllRecipes(response.data.reverse());
                    })
                    .catch(error => console.log(`error: ${error}`));
            })
            .catch(error => console.log(`error: ${error}`));

    }, []);

    const addRecipeToFavorite = (recipeId) => {
        userService.addRecipeToFavorite(recipeId)
            .then(response => {
                console.log(`recipes added to favorite`)
                props.add_recipe_to_favorite(recipeId);
                navigate("/userprofile/favoriterecipes");
            })
            .catch(err => create_alert_message("WARNING_ALERT", "La recette n'a pas pu être ajoutée aux favoris"));
    }

    return (
        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
            <Grid container
                direction="column"
                justifyContent="center"
                alignItems="center"
                rowSpacing={2}
                spacing={0}>
                {currentTableData.map((recipe, index) =>
                    <Grid key={index} item xs={12} mb={4}>
                        <Card>
                            <Grid container direction="row" justifyContent="center" alignItems='center'>
                                <Grid item xs={6}>

                                    <Stack spacing={2} justifyContent="center" alignItems='center' xs={12} md={6}>
                                        <Typography component="h5" variant="h5">
                                            {recipe.label}
                                        </Typography>
                                        <Stack direction="row" spacing={2} alignItems='center' xs={12} md={6}>
                                            <Button color="primary" variant="contained"
                                                onClick={() => navigate(`/userprofile/seerecipedetails/${recipe.id}`)}>
                                                Voir détail
                                            </Button>
                                            {(!props.recipesUserFavoriteReducer.map(re => re.id).includes(recipe.id))
                                                ? <Button color="secondary" variant="contained"
                                                    onClick={() => addRecipeToFavorite(recipe.id)}>
                                                    Ajouter au favoris
                                                </Button>
                                                : ""
                                            }

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

            <Pagination count={Math.ceil(allRecipes.length / pageSize)} page={currentPage} onChange={(e, value) => { setCurrentPage(value) }} />

        </Stack>
    );
}

export default ViewAllRecipes;