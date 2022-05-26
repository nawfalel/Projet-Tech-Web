import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useMemo, useState } from 'react';
import { Pagination, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import adminService from '../../../../services/admin.service';
import { useFormik } from 'formik';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { create_alert_message } from '../../../../utilities/alerts';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


export default function IngredientAreaAdmin(props) {

    const [valueTabListOfIngredient, setValueTabListOfIngredient] = useState(0);

    const [listOfIngredientPage, setListOfIngredientPage] = useState(1);

    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 3;

    //Will recompute only if dependency changes
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;

        return props.ingredientListAdmin.slice(firstPageIndex, lastPageIndex);
    }, [props.ingredientListAdmin, currentPage]);

    const formikAddIngredient = useFormik({
        initialValues: {
            label: '',
            imageUrl: ''
        },
        onSubmit: values => {

            adminService.addIngredient(values)
                .then(response => {
                    create_alert_message("SUCCESS_ALERT", "L'ingrédient a été ajouté avec succès");
                    props.add_ingredient_to_state_action_creator({...values, id: response.data.id});
                })
                .catch(error => create_alert_message("WARNING_ALERT", "L'ingrédient n'a pas pu être ajouté"));

        },
    });

    const navigate = useNavigate();


    const handleTabsChangeListIngredient = (event, newValue) => {
        setValueTabListOfIngredient(newValue);
    };

    const handleListOfIngredientPageChange = (event, value) => {
        setListOfIngredientPage(value);
    };

    const deleteIngredient = (id) => {

        adminService.deleteIngredient(id)
                    .then(response => {
                        const newIngredientList = 
                                props.ingredientListAdmin
                                     .filter(ingredient => ingredient.id !== id);
                        props.initialize_list_of_ingredient_admin(newIngredientList);
        })
        .catch(error => create_alert_message("WARNING_ALERT", "L'ingrédient n'a pas pu être supprimé (peut être qu'il est utilisé dans certaines recettes créés)"))
        
    }

    const switchToUpdateIngredientPage = (id) => {
        navigate(`/adminprofile/updateingredient/${id}`);
    }

    useEffect(() => {
        adminService.getListOfIngredient()
            .then(response => {
                props.initialize_list_of_ingredient_admin(response.data.reverse());
            })
            .catch(err => console.log("can't retrieve list of ingredients"));
    }, []);


    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={valueTabListOfIngredient}
                onChange={handleTabsChangeListIngredient}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="List of ingredients" {...a11yProps(0)}/>
                <Tab label="Add Ingredient" {...a11yProps(1)} />
            </Tabs>


            <TabPanel value={valueTabListOfIngredient} index={0}>
                <Grid container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    rowSpacing={2}
                    spacing={0}>
                    {currentTableData.map(ingredient =>
                        <Grid item xs={12} mb={4}>
                            <Card>
                                <Grid container direction="row" justifyContent="center" alignItems='center'>
                                    <Grid item xs={6}>

                                        <Stack spacing={2} justifyContent="center" alignItems='center' xs={12} md={6}>
                                            <Typography component="h5" variant="h5">
                                                {ingredient.label}
                                            </Typography>
                                            <Stack direction="row" spacing={2} alignItems='center' xs={12} md={6}>
                                                <Button color="third"
                                                        variant="contained"
                                                        onClick={() => switchToUpdateIngredientPage(ingredient.id)}>
                                                    Mettre à jour
                                                </Button>
                                                <Button color="secondary" variant="contained"
                                                        onClick={() => deleteIngredient(ingredient.id)}>
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
                                            src={ingredient.imageUrl}
                                        />
                                    </Grid>

                                </Grid>
                            </Card>
                        </Grid>
                    )}


                </Grid>


                <Pagination count={Math.ceil(props.ingredientListAdmin.length / pageSize)} page={currentPage} onChange={(e, value) => { setCurrentPage(value) }} />

            </TabPanel>

            <TabPanel value={valueTabListOfIngredient} index={1}>
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
                        <Box component="form" onSubmit={formikAddIngredient.handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="label"
                                label="Ingredient abel"
                                value={formikAddIngredient.values.label}
                                onChange={formikAddIngredient.handleChange}
                                name="label"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="imageUrl"
                                label="Url d'image"
                                id="imageUrl"
                                value={formikAddIngredient.values.imageUrl}
                                onChange={formikAddIngredient.handleChange}

                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Ajouter ingrédient
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </TabPanel>
        </Box>
    );
}
