import {Link} from 'react-router-dom'
import {Box, Button, Container, Typography} from '@mui/material'
import {useAuth} from "../utils/AuthContext.tsx";
import DocList from "./docs/DocList.tsx";

function Home() {
    const { isAuthenticated } = useAuth()


    if(isAuthenticated) {
        return (
            <DocList/>
        )
    } else {
        return (
            <Container>
                <Typography variant="h2" gutterBottom>
                    Home Page
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="primary" component={Link} to="/register">
                        Register
                    </Button>
                    <Button variant="contained" color="primary" component={Link} to="/about">
                        About
                    </Button>
                </Box>
            </Container>
        )
    }}

export default Home