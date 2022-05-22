import { Divider, Grid, MenuItem, Select, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik, FieldArray, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import adminService from '../../../services/admin.service';
import userService from '../../../services/user.service';


const AddRecipe = (props) => {


    const formikInitialValues = {
        label: '',
        description: '',
        imageUrl: '',
        ingredients: []
    };

    const addIngredientFormik = (event, values, setValues) => {

        const ingredients = [...values.ingredients];
        // const numberOfIngredients = (ingredients.length) ? ingredients.length + 1 : 0;
        ingredients.push({ id: "", quantityInfo: "", ingredientPreparationDesc: "" });

        setValues({ ...values, ingredients });

    }

    useEffect(() => {
        adminService.getListOfIngredient()
            .then(response => {
                props.initialize_list_of_ingredient_admin(response.data);
            })
            .catch(error => console.log(`Couldn't fetch ingredient`))

    }, []);

    const addRecipe = (values) => {
        console.log('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
        userService.addRecipe(values)
                    .then(response => {
                        console.log(`recipe added`)
                    })
                    .catch(err => console.log(`error : ${err}`))
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
            <Formik initialValues={formikInitialValues}  onSubmit={addRecipe}>
                {({ errors, values, touched, setValues }) => (
                    <Form component="form" noValidate sx={{ mt: 1 }}>
                        <Field
                            name="label"
                            render={({ field, form }) => (
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="label"
                                label="Intitulé de la recette"
                                id="imageUrl"
                                value={field.value}
                                onChange={field.onChange}
                            />
                            )}
                        />
                        <Field
                            name="description"
                            render={({ field, form }) => (
                                <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="description"
                                label="Description"
                                id="description"
                                value={field.value}
                                onChange={field.onChange}
                            />
                            )}
                        />

                        <Field
                            name="imageUrl"
                            render={({ field, form }) => (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="imageUrl"
                                    label="Url d'image"
                                    id="imageUrl"
                                    value={field.value}
                                    onChange={field.onChange}
                            />
                            )}
                        />
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, width: 300 }}
                                onClick={(e) => addIngredientFormik(e, values, setValues)}
                            >
                                Ajouter ingrédient
                            </Button>
                        </Box>
                        <FieldArray name="tickets">
                            {() => values.ingredients.map((ingredient, index) => {
                                return (
                                    <Box>
                                        <Divider />
                                        <Grid container key={index} spacing={1} xs={{ mt: 2, mb: 2 }}>
                                            <Grid item xs={4}>
                                                <Field
                                                    name={`ingredients.${index}.quantityInfo`}
                                                    render={({ field, form }) => (
                                                        <TextField
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            name={`ingredients.${index}.quantityInfo`}
                                                            label="Description de la préparation"
                                                            id="ingredient_preparation"
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                    />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Field
                                                    name={`ingredients.${index}.ingredientPreparationDesc`}
                                                    render={({ field, form }) => (
                                                        <TextField
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            label="Quantité à utiliser"
                                                            id="ingredient_quantity_info"
                                                            name={`ingredients.${index}.ingredientPreparationDesc`}
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                    />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Box xs={{ mt: 4 }}>
                                                <Field
                                                    name={`ingredients.${index}.id`}
                                                    as="select"
                                                    render={({ field, form }) => (
                                                    <Select
                                                        labelId="ingredientToAdd"
                                                        id="id"
                                                        name={`ingredients.${index}.id`}
                                                        fullWidth
                                                        required
                                                        label="Ingredient"
                                                        value={field.value}
                                                        onChange={field.onChange}

                                                    >
                                                        {
                                                            props.ingredientListAdmin.map((ing, index) =>
                                                                <MenuItem value={ing.id}>{ing.label}</MenuItem>)
                                                        }
                                                    </Select>
                                                    )}/>
                                                </Box>
                                            </Grid>

                                        </Grid>

                                    </Box>
                                );
                            })}
                        </FieldArray>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Ajouter recette
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
}

export default AddRecipe;