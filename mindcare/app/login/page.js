"use client"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import withAuth from '../withAuth';

import Box from 
 '@mui/material/Box';

const  login = () =>{
    return (
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <TextField
        label="Usuario"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        label="Contraseña"
        type="password"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="password"
        autoComplete="current-password"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        type="submit"
        sx={{ mt: 3, mb: 2 }}
      >
        Iniciar sesión
      </Button>
    </Box>
    );
  }

  export default  withAuth(login);