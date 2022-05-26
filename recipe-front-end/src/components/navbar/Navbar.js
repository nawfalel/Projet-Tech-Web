import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Button, IconButton, Stack } from '@mui/material';
import { Box } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import { InputBase } from '@mui/material';
import { Badge } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Menu } from '@mui/material';
import { AccountCircleOutlined, LocalDining, Logout, Mail, NotificationImportant } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const CustomNavbar = (props) => {

    // launch action creator (redux) to verify 
    // if the user is connected

    const navigate = useNavigate();


    const logout = () => {
        authService.logout();
        navigate("/")
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <Menu />
                    </IconButton>
                    <LocalDining sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            Recipe
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1 }} />

                    {
                        (!props.isUserConnectedReducer) ?
                            <Stack direction="row" spacing={2}>

                                <Link to="signin" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                    <Button variant="contained" color="third">
                                        Se connecter
                                    </Button>
                                </Link>
                                <Link to="signup" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                    <Button variant="contained" color="secondary">
                                        Créer un compte
                                    </Button>
                                </Link>
                            </Stack>
                            :
                            <Stack direction="row" spacing={2}>

                                <Button onClick={() => logout()} variant="contained" color="secondary">
                                    Logout
                                </Button>

                            </Stack>
                    }

                </Toolbar>
            </AppBar>

        </Box>
    );
}

export default CustomNavbar;