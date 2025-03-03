import {TextField, Button, Container, Typography, Box, IconButton, InputAdornment} from '@mui/material';
import { useState } from 'react';
import RegisterType from '../types/RegisterType.ts';
import CachedIcon from '@mui/icons-material/Cached';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomSnackbar from '../elements/CustomSnackbar.tsx';
import {useNavigate} from "react-router-dom";

function Register() {
  const [register, setRegister] = useState<RegisterType>({
    username: '',
    socialSecurityNumber: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [loading, setLoading] = useState<boolean>(false);

  function handleChange(key: string, value: string) {
    setRegister({
      ...register,
      [key]: value.trim()
    });
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function toggleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  function fieldsAreValid(): boolean {
    if (register.username.length < 3) {
      setSnackbarMessage('Le nom d\'utilisateur doit contenir au moins 3 caractères');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }
    if (register.socialSecurityNumber.length !== 13) {
      setSnackbarMessage('Le numéro de sécurité sociale doit contenir 13 caractères');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(register.email)) {
      setSnackbarMessage('L\'email n\'est pas valide');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }
    if (register.password.length < 5) {
      setSnackbarMessage('Le mot de passe doit contenir au moins 8 caractères');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }
    if (register.password !== confirmPassword) {
      setSnackbarMessage('Les mots de passe ne correspondent pas');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }
    return true;
  }

  async function handleRegister() {
    if (fieldsAreValid()) {
      setLoading(true);
      try {
        const response = await fetch('https://127.0.0.1:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(register)
        });

        if (response.ok) {
          setSnackbarMessage('Inscription réussie');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
          navigate('/login');
        } else {
          const errorData = await response.json();
          setSnackbarMessage(`Erreur: ${errorData.message}`);
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        }
      } catch (error) {
        console.error('Failed to register:', error);
        setSnackbarMessage('Erreur de réseau ou serveur');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function generatePseudonym(): string {
    const nouns = ["Faucon", "Tigre", "Aigle", "Loup", "Lion", "Panthère", "Renard", "Serpent", "Ours", "Léopard"];
    const adjectives1 = ["Rapide", "Silencieux", "Courageux", "Intelligent", "Puissant", "Furtif", "Majestueux", "Sauvage"];
    const adjectives2 = ["Mystérieux", "Féroce", "Agile", "Sage", "Brillant", "Doux", "Surpris", "Fougueux"];

    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomAdjective1 = adjectives1[Math.floor(Math.random() * adjectives1.length)];
    const randomAdjective2 = adjectives2[Math.floor(Math.random() * adjectives2.length)];

    return `${randomNoun}${randomAdjective1}${randomAdjective2}`;
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
            Register
          </Typography>
          <Box display={'flex'} gap={1} alignItems={'center'}>
            <TextField
                label="Nom d'utilisateur"
                variant="outlined"
                margin="normal"
                fullWidth
                value={register.username}
                onChange={(e) => handleChange('username', e.target.value)}
            />
            <IconButton onClick={() => handleChange('username', generatePseudonym())}>
              <CachedIcon />
            </IconButton>
          </Box>
          <TextField
              label="Numéro de sécurité sociale"
              variant="outlined"
              margin="normal"
              fullWidth
              value={register.socialSecurityNumber}
              onChange={(e) => handleChange('socialSecurityNumber', e.target.value)}
          />
          <TextField
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={register.email}
              onChange={(e) => handleChange('email', e.target.value)}
          />
          <TextField
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              error={register.password !== confirmPassword && confirmPassword.length > 0}
              fullWidth
              value={register.password}
              onChange={(e) => handleChange('password', e.target.value)}
              InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                )
              }}
          />
          <TextField
              label="Confirmation"
              type={showConfirmPassword ? 'text' : 'password'}
              variant="outlined"
              error={register.password !== confirmPassword && confirmPassword.length > 0}
              margin="normal"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleShowConfirmPassword} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                )
              }}
          />
          <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => handleRegister()}
              style={{ marginTop: '16px' }}
              loading={loading}
          >
            Register
          </Button>
          <CustomSnackbar
              open={snackbarOpen}
              message={snackbarMessage}
              severity={snackbarSeverity}
              onClose={handleSnackbarClose}
          />
        </Box>
      </Container>
  );
}

export default Register;