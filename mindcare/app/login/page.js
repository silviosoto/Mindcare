"use client"
import { useEffect, useRef, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { get, postNoAutenticate, put, del } from '../Services/apiService';
import { useCookie } from '../hooks/useCookie.hook';
import { useRouter } from "next/navigation"
import { useAppContext } from "../context/context";

const defaultTheme = createTheme();

export default function SignIn() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { set, remove } = useCookie();
  const { push } = useRouter();
  const {
		setUser
	} = useAppContext();

  const onSubmit = async (data) => {
    try {

      const newData = await postNoAutenticate('auth/login', data);
      // console.log('logged:', newData);
      set("userid", newData?.userId)
      set("username", newData?.userName)
      set("profile", newData?.profile)
      set("accessToken", newData?.accessToken)
      set("refreshToken", newData?.refreshToken)
      setUser( { userId: newData?.userId, username: newData?.username, profile: newData?.profile})
      push('Dashboard')

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
              {...register('username', { required: 'El correo electrónico es obligatorio' })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', { required: 'La contraseña es obligatoria' })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}


function Copyright(props) {


  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
