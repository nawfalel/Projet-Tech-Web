import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NoDataAvailable = (props) => {

    const {message} = props;

    return (
        <Box sx={{mt: 4}}>
            <Typography component="h2" variant="h3" color="inherit">
              {message}
            </Typography>
        </Box>
    );
}

export default NoDataAvailable;