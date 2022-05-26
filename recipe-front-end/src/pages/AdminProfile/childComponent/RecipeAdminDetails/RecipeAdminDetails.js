import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const RecipeAdminDetails = (props) => {

    const [recipeData, setRecipeData] = useState({ imageUrl: "", description: "", label: "", recipeIngredientsDto: [] });
    const navigate = useNavigate();
    const { recipeid: recipeId } = useParams();
    console.log(recipeId)

    useEffect(() => {
 
        const listOfRecipes = props.recipesAllAdminReducer;
        if (listOfRecipes.length == 0) {
            navigate("/adminprofile/recipe");
        }

        else {
            
            const recipe = listOfRecipes.find(rec => rec.id == recipeId);

            setRecipeData(recipe);
        }

    }, []);

    return (

        <Stack spacing={3} direction="column" justifyContent="center" alignItems="center">
            <Card sx={{ maxWidth: 900 }}>
                <Box
                    component="img"
                    sx={{
                        height: 400,
                        width: 900,
                        maxHeight: { xs: 400, md: 400 },
                        maxWidth: { xs: 900, md: 900 },
                    }}
                    src={recipeData.imageUrl}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {recipeData.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {recipeData.description}
                    </Typography>

                    <Typography gutterBottom variant="h6" component="div" sx={{ mt: 2 }}>
                        Ingredients
                    </Typography>

                    <Box>
                        <Stack spacing={3} direction="column" justifyContent="center">
                            {recipeData.recipeIngredientsDto.map((ingredient, ingredientIndex) =>

                                <Card key={ingredientIndex}>
                                    <Grid container direction="row" justifyContent="flex-start" alignItems='center'>
                                        <Grid item xs={2}>
                                            <Box
                                                component="img"
                                                sx={{
                                                    height: 65,
                                                    width: 100,
                                                    maxHeight: { xs: 65, md: 65 },
                                                    maxWidth: { xs: 100, md: 100 },
                                                }}
                                                src={ingredient.ingredientImageUrl}
                                            />
                                        </Grid>

                                        <Grid item>
                                            <Stack spacing={2} direction="column" justifyContent="center" alignItems='flex-start' xs={12} md={6}>
                                                <Box>
                                                    <Typography component="h5" variant="body">
                                                        Méthode de préparation:
                                                    </Typography>
                                                    <Typography component="h5" variant="body2">
                                                        {ingredient.ingredientPreparationDesc}
                                                    </Typography>
                                                </Box>


                                                <Box>
                                                    <Typography component="h5" variant="body">
                                                        Qantité à mettre:
                                                    </Typography>
                                                    <Typography component="h5" variant="body2">
                                                        {ingredient.quantityInfo}
                                                    </Typography>
                                                </Box>


                                            </Stack>
                                        </Grid>


                                    </Grid>
                                </Card>
                            )}
                        </Stack>
                    </Box>

                </CardContent>

            </Card>
        </Stack>
    );
}

export default RecipeAdminDetails;