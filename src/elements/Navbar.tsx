import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../assets/MB_white_2.svg'
import {useAuth} from "../utils/AuthContext.tsx";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="fixed">
                <Toolbar display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'} component={Link} to="/">
                        <Typography variant="h4" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', fontFamily: 'Roboto Condensed, sans-serif', fontWeight: 900 }}>
                            MediBook
                        </Typography>
                        <img src={logo} alt="MediBook Logo" style={{ height: 40, marginRight: 8 }} />
                    </Box>
                    {!isAuthenticated ? (
                        <Box sx={{ ml: 'auto' }}>
                            <Button color="inherit" component={Link} to="/login" variant={"contained"} sx={{ mr: 2 }}>
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register" variant={'outlined'}>
                                Register
                            </Button>
                        </Box>
                    ) : (
                        <Box sx={{ ml: 'auto' }}>
                            <Button color="inherit" onClick={() => logout} variant={'outlined'}>
                                Logout
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar