import {
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
} from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../common/hooks/auth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signin, isAutenticated, token } = useAuth();

  console.log('Login', { isAutenticated, token });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const input = {
      email: formData.get('email') ?? '',
      password: formData.get('password') ?? '',
    };

    signin(input);
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
            />
          </FormControl>

          <FormControl required variant="outlined">
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
                console.info("I'm a button.");
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
