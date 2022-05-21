
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import adminService from '../../../../services/admin.service';

const UpdateIngredientAdmin = (props) => {

    const [ingredientId, setIngredientId] = useState(0);
    const [ingredientData, setIngredientData] = useState({ label: "", imageUrl: "" });

    const { id } = useParams();



    const formikUpdateIngredient = useFormik({
        initialValues: {
            label: ingredientData.label,
            imageUrl: ingredientData.imageUrl
        },
        onSubmit: values => {
            
            adminService.updateIngredient({...values, id})
                .then(response => {
                    const newIngredientList = 
                                props.ingredientListAdmin
                                     .filter(ingredient => ingredient.id !== values.id);
                    props.initialize_list_of_ingredient_admin([...newIngredientList, {...values}]);
                })
                .catch(error => console.log(`error while adding ingredient`))

        },
    });

    useEffect(() => {

        let ingredient = props.ingredientListAdmin.find(ing => ing.id == id);

        ingredient = (ingredient) ? ingredient : { label: "", imageUrl: "" };
        setIngredientData(ingredient);

    }, [ingredientId]);

    useEffect(() => {
        setIngredientId(id);
    }, []);

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
                <Box component="form" onSubmit={formikUpdateIngredient.handleSubmit} noValidate sx={{ mt: 1 }}>

                    <TextField
                        id="outlined-textarea"
                        margin="normal"
                        required
                        fullWidth
                        label={"Label"}
                        placeholder={ingredientData.label}
                        value={formikUpdateIngredient.values.label}
                        onChange={formikUpdateIngredient.handleChange}
                        name="label"
                        autoFocusmultiline
                    />
              
              <TextField
                        id="outlined-textarea"
                        margin="normal"
                        required
                        fullWidth
                        label={"Url de l'image"}
                        placeholder={ingredientData.imageUrl}
                        value={formikUpdateIngredient.values.imageUrl}
                        onChange={formikUpdateIngredient.handleChange}
                        name="imageUrl"
                        autoFocusmultiline
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Mettre à jour ingrédient
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default UpdateIngredientAdmin;