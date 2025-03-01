import {Button, Typography} from "@mui/material";

function Unknown() {
    return (
        <>
            <Typography variant="h3" gutterBottom>
                Page not found
            </Typography>
            <Typography variant="h4" gutterBottom>
                404
            </Typography>
            <Button variant="contained" color="primary" href="/">
                Go to Home
            </Button>
        </>
    );
}

export default Unknown;