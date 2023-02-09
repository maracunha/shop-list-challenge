import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stack,
  Paper,
  Button,
  Link,
  FormHelperText,
} from '@mui/material';

import { useAuth } from '../../common/hooks/auth';
import { useAppSelector } from '../../common/hooks/reduxHooks';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { signin, error } = useAuth();
  console.log({ error });

  const { value: userState } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (userState.token) {
      navigate('/products', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.token]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const inputData = {
      email: formData.get('email') ?? '',
      password: formData.get('password') ?? '',
    };

    signin(inputData);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      justifyItems="center"
      alignItems="center"
      height="100vh"
    >
      <Paper elevation={1} sx={{ height: 'fit-content' }}>
        <Typography variant="h5" textAlign="center" py={2}>
          Entre em sua conta
        </Typography>
        <Stack
          component="form"
          px={4}
          py={2}
          height="content-fit"
          spacing={2}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <FormControl required variant="outlined">
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="text"
              label="Email"
              defaultValue="Ola92@gmail.com"
              error={error}
            />
          </FormControl>

          <FormControl required error={error} variant="outlined">
            <InputLabel htmlFor="password">Senha</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              defaultValue="nFRb2uF4jGqRC6y"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha"
            />
            {error && <FormHelperText id="password-text">Email ou senha inválido</FormHelperText>}
          </FormControl>
          <Button type="submit" variant="contained">
            Entrar
          </Button>
          <Box display="flex">
            <Typography mr="2rem">Primeiro acesso?</Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                navigate('/signup');
              }}
            >
              Registre-se
            </Link>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
