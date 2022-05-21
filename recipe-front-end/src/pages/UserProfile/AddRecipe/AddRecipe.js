import { Divider, Grid, MenuItem, Select, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import adminService from '../../../services/admin.service';


const AddRecipe = (props) => {

    const [ingredientsState, setIngredientsState] = useState({ component: [] });
    const [ingredientsChoosen, setIngredientsChoosen] = useState([]);
    const [valueOfSubFields, setValueOfSubFields] = useState([]);
    const formikAddRecipe = useFormik({
        initialValues: {
            label: '',
            description: '',
            imageUrl: '',
            ingredients: Array(30).fill({id: "", ingredientPreparationDesc: "", quantityInfo: ""})
        },
        onSubmit: values => {
            console.log(`values ${JSON.stringify(values)}`)
            console.log(`ingredients: ${JSON.stringify(ingredientsChoosen)}`)
        }
    });

    const addIngredientContainer = () => {

        setIngredientsState({
            component: [...ingredientsState.component, ingredientContainerComponent()]
        });

    }

    useEffect(() => {
        adminService.getListOfIngredient()
            .then(response => {
                props.initialize_list_of_ingredient_admin(response.data);
            })
            .catch(error => console.log(`Couldn't fetch ingredient`))

    }, []);


  
    const ingredientContainerComponent = () => {

        const newIngredientIndex = ingredientsState.component.length;
        console.log(`index: ${newIngredientIndex}`)
        return <Box>
            <Divider />
            <Grid container key={newIngredientIndex} spacing={1} xs={{ mt: 2, mb: 2 }}>
                <Grid item xs={4}>
                    <TextField
                        margin="normal"
                        multiline
                        required
                        name={`ingredients[newIngredientIndex].quantityInfo`}
                        label="Description de la préparation"
                        id="ingredient_preparation"
                        value={formikAddRecipe.values.ingredients[newIngredientIndex].quantityInfo}
                        onChange={formikAddRecipe.handleChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="normal"
                        multiline
                        required
                        label="Quantité à utiliser"
                        id="ingredient_quantity_info"
                        name={`ingredients[newIngredientIndex].ingredientPreparationDesc`}
                        value={formikAddRecipe.values.ingredients[newIngredientIndex].ingredientPreparationDesc}
                        onChange={formikAddRecipe.handleChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Box xs={{ mt: 4 }}>
                        <Select
                            labelId="ingredientToAdd"
                            id="ingredientToAdd"
                            name={`ingredients[newIngredientIndex].id`}
                            value={formikAddRecipe.values.ingredients[newIngredientIndex].id}
                            onChange={formikAddRecipe.handleChange}
                            fullWidth
                            required
                            label="Ingredient"
                        >
                            {
                                props.ingredientListAdmin.map((ing, index) =>
                                    <MenuItem value={ing.id}>{ing.label}</MenuItem>)
                            }
                        </Select>
                    </Box>
                </Grid>

            </Grid>
        </Box>

    }


    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box component="form" onSubmit={formikAddRecipe.handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="label"
                    label="Intitulé de la recette"
                    value={formikAddRecipe.values.label}
                    onChange={formikAddRecipe.handleChange}
                    name="label"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    value={formikAddRecipe.values.description}
                    onChange={formikAddRecipe.handleChange}

                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="imageUrl"
                    label="Url d'image"
                    id="imageUrl"
                    value={formikAddRecipe.values.imageUrl}
                    onChange={formikAddRecipe.handleChange}

                />
                <Box>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, width: 300 }}
                        onClick={addIngredientContainer}
                    >
                        Ajouter ingrédient
                    </Button>
                </Box>

                {ingredientsState.component}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Ajouter recette
                </Button>
            </Box>
        </Box>
    );
}

export default AddRecipe;