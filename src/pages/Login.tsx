import { TextField, Button, Container, Typography, Box } from '@mui/material'
import {useAuth} from "../utils/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate();

  function handleLogin() {
    login()
    navigate('/');
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          style={{ marginTop: '16px' }}
          onClick={() => handleLogin()}
        >
          Login
        </Button>
      </Box>
    </Container>
  )
}

export default Login