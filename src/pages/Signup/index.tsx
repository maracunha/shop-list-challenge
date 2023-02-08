import {
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Stack,
  Paper,
  Button,
  Link,
} from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormItemProps {
  name: string;
  label: string;
  number?: boolean;
  fullWidth?: boolean;
}

const FormItem = ({ name, label, number = false, fullWidth = false }: FormItemProps) => (
  <FormControl fullWidth={fullWidth} required variant="outlined">
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <OutlinedInput id={name} name={name} type={number ? 'number' : 'text'} label={label} />
  </FormControl>
);

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const input = {
      email: formData.get('email') ?? '',
      password: formData.get('password') ?? '',
    };
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
          <FormItem fullWidth label="Nome" name="name" />
          <div>
            <FormItem label="Sobrenome" name="surname" />
            <FormItem label="Sexo" name="gerero" />
          </div>
          <div>
            <FormItem label="CPF:" name="cfp" number />
            <FormItem label="Data de Nascimente" name="date" />
          </div>
          <hr />

          <div>
            <FormItem label="Email" name="email" />
            <FormItem label="Senha" name="password" />
          </div>

          <Button type="submit" variant="contained">
            Registre-se
          </Button>
          <Box display="flex">
            <Typography mr="2rem">Já é registrado?</Typography>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                navigate('/login');
              }}
            >
              Entre aqui
            </Link>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Signup;
