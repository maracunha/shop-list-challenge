import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

import { Box, Typography, Stack, Paper, Button, Link, TextField, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useCreateUserMutation } from '../../common/services/api';
import { IFormInputUser } from '../../common/types';
import { useGetAddress } from '../../common/hooks/useGetAddress';

const Signup = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading, isSuccess }] = useCreateUserMutation();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    //  formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      sexo: '',
      cpf: '',
      date: null,
      email: '',
      password: '',
      cep: '',
      city: '',
      state: '',
      patio: '',
      neighborhood: '',
      complement: '',
    },
    mode: 'onChange',
  });

  const watchCep = watch('cep');
  const address = useGetAddress(watchCep);

  if (address.localidade) {
    setValue('city', address.localidade);
    setValue('state', address.uf);
    setValue('patio', address.logradouro);
    setValue('neighborhood', address.bairro);
  }

  const onSubmit: SubmitHandler<IFormInputUser> = async (data) => {
    const bornDate = dayjs(data.date).unix();

    const prepareData = {
      nome: data.name,
      sobrenome: data.surname,
      cpf: data.cpf,
      sexo: data.sexo,
      dt_nascimento: bornDate,
      cep: data.cep,
      cidade: data.city,
      estado: data.state,
      logradouro: data.patio,
      bairro: data.neighborhood,
      complemento: data.complement,
      email: data.email,
      senha: data.password,
    };

    await createUser(prepareData);
  };

  if (isSuccess) {
    navigate('/products', { replace: true });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        justifyContent="center"
        justifyItems="center"
        alignItems="center"
        height="100vh"
      >
        <Paper elevation={1}>
          <Typography variant="h5" textAlign="center" py={2}>
            Crie sua conta
          </Typography>
          <Stack direction="column" p={2} spacing={1}>
            <Grid container spacing={0.5}>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange } }) => (
                  <Grid item xs={3}>
                    <TextField
                      label="Nome"
                      fullWidth
                      required
                      variant="outlined"
                      onChange={onChange}
                    />
                  </Grid>
                )}
              />
              <Grid item xs={9}>
                <Controller
                  name="surname"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <TextField
                      label="Sobrenome"
                      fullWidth
                      required
                      variant="outlined"
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={0.5}>
              <Controller
                name="cpf"
                control={control}
                render={({ field: { onChange } }) => (
                  <TextField label="CPF" required variant="outlined" onChange={onChange} />
                )}
              />
              <Controller
                name="sexo"
                control={control}
                render={({ field: { onChange } }) => (
                  <TextField label="Sexo" required variant="outlined" onChange={onChange} />
                )}
              />
              <Controller
                name="date"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Data de nacimento"
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                )}
              />
            </Stack>

            <Grid container spacing={0.5}>
              <Controller
                name="cep"
                control={control}
                render={({ field: { onChange } }) => (
                  <Grid item xs={4}>
                    <TextField
                      label="CEP"
                      fullWidth
                      required
                      variant="outlined"
                      onChange={onChange}
                    />
                  </Grid>
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Grid item xs={4}>
                    <TextField
                      label="Cidade"
                      fullWidth
                      required
                      variant="outlined"
                      onChange={onChange}
                      value={value}
                    />
                  </Grid>
                )}
              />
              <Controller
                name="state"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Grid item xs={4}>
                    <TextField
                      label="Stado"
                      fullWidth
                      required
                      variant="outlined"
                      onChange={onChange}
                      value={value}
                    />
                  </Grid>
                )}
              />
            </Grid>

            <Grid container spacing={0.5}>
              <Controller
                name="patio"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Grid item xs={4}>
                    <TextField
                      label="Logradouro"
                      fullWidth
                      required
                      variant="outlined"
                      onChange={onChange}
                      value={value}
                    />
                  </Grid>
                )}
              />
              <Controller
                name="neighborhood"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Grid item xs={4}>
                    <TextField
                      label="Bairro"
                      fullWidth
                      required
                      variant="outlined"
                      onChange={onChange}
                      value={value}
                    />
                  </Grid>
                )}
              />
              <Controller
                name="complement"
                control={control}
                render={({ field: { onChange } }) => (
                  <Grid item xs={4}>
                    <TextField
                      label="Complemento"
                      fullWidth
                      required
                      variant="outlined"
                      onChange={onChange}
                    />
                  </Grid>
                )}
              />
            </Grid>

            <Grid container spacing={0.5}>
              <Controller
                name="email"
                control={control}
                render={({ field: { onChange } }) => (
                  <Grid item xs={6}>
                    <TextField
                      label="E-mail"
                      fullWidth
                      required
                      variant="outlined"
                      onChange={onChange}
                    />
                  </Grid>
                )}
              />
              <Grid item xs={6}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <TextField
                      label="Senha"
                      fullWidth
                      required
                      variant="outlined"
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
            </Grid>
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
    </form>
  );
};

export default Signup;
