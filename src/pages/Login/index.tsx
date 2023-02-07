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
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ChangeHandler } from 'react-hook-form';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    setState({ ...state, [id]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ state });
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
            <OutlinedInput id="email" type="text" label="Email" onChange={onFieldChange} />
          </FormControl>

          <FormControl required variant="outlined">
            <InputLabel htmlFor="password">Senha</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
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
              onChange={onFieldChange}
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
