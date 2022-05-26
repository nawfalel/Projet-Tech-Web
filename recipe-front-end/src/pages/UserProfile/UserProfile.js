import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import authService from '../../services/auth.service';
import { Button, Stack } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const UserProfile = () => {

    let [username, setUsername] = useState("");
    const navigate = useNavigate();

    const logout = () => {
        authService.logout();
        navigate("/")
    }

    useEffect(() => {
        setTimeout(() => {
            setUsername(authService.getUsernameFromLocalStorage());
        }, 4000)

    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Bonjour {username}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">

                            <Button onClick={() => logout()} variant="contained" color="success">
                                Logout
                            </Button>

                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />

                <MenuList dense>

                    <MenuItem>
                        <ListItemText
                            disableTypography
                            primary={<Typography variant="h5">Recette</Typography>}
                        />
                    </MenuItem>

                    <MenuItem>
                        <ListItemText
                            disableTypography
                            inset
                            primary={<Link to="/userprofile/viewrecipe" style={{ textDecoration: 'none' }}>
                                <Typography component="h6">Voir mes recettes</Typography>
                            </Link>}
                        />
                    </MenuItem>

                    <MenuItem>
                        <ListItemText
                            disableTypography
                            inset
                            primary={<Link to="/userprofile/addrecipe" style={{ textDecoration: 'none' }}>
                                <Typography component="h6">Ajouter une recette</Typography>
                            </Link>}
                        />

                    </MenuItem>

                    <Divider />

                    <MenuItem>
                        <ListItemText
                            disableTypography
                            primary={<Typography variant="h5">Favoris</Typography>}
                        />
                    </MenuItem>

                    <MenuItem>
                        <ListItemText
                            disableTypography
                            inset
                            primary={<Link to="/userprofile/allrecipes" style={{ textDecoration: 'none' }}>
                                <Typography component="h6">Découvrir recette</Typography>
                            </Link>}
                        />
                    </MenuItem>

                    <MenuItem>
                        <ListItemText
                            disableTypography
                            inset
                            primary={<Link to="/userprofile/favoriterecipes" style={{ textDecoration: 'none' }}>
                                <Typography component="h6">Voir ma liste de favoris</Typography>
                            </Link>}
                        />
                    </MenuItem>
                </MenuList>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default UserProfile;