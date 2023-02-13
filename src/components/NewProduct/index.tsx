import { useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Button,
  TextField,
  Grid,
  InputAdornment,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { useCreateProductMutation } from '../../common/services/api';
import { IFormNewProduct } from '../../common/types';

const NewProduct = () => {
  const [createProduct, { isSuccess }] = useCreateProductMutation();
  const navigate = useNavigate();

  const { handleSubmit, control, watch, setValue, setError } = useForm({
    defaultValues: {
      name: '',
      avatar: '',
      price: '',
      stock: 0,
      sales: 0,
      brand: '',
    },
    mode: 'onChange',
  });

  // get the final name and extension
  // that is only because this api is a fake one,
  // just to pretend we have the right file name.
  const imageWatch = watch('avatar');
  useEffect(() => {
    const [imageName] = imageWatch.match(/(\w+).(png|bmp|jpe?g)$/g) ?? [''];
    if (!imageName) {
      setError('avatar', { message: 'Selecione um imagen png ou jpg' });
    }

    setValue('avatar', imageName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageWatch]);

  const onSubmit: SubmitHandler<IFormNewProduct> = async (data) => {
    const image = `https://cdn.fakercloud.com/avatars/${data.avatar}`;

    const prepareData = {
      nome: data.name,
      avatar: image,
      preco: data.price,
      qt_estoque: +data.stock,
      qt_vendas: +data.sales,
      marca: data.brand,
    };

    await createProduct(prepareData);
  };

  if (isSuccess) {
    navigate('/products', { replace: true });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="center" justifyItems="center">
        <Paper elevation={1}>
          <Typography variant="h5" textAlign="center" p={3}>
            Crie um novo produto
          </Typography>
          <Stack direction="column" p={2} spacing={1}>
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
            <Controller
              name="brand"
              control={control}
              render={({ field: { onChange } }) => (
                <TextField
                  label="Marca"
                  fullWidth
                  required
                  variant="outlined"
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field: { onChange } }) => (
                <TextField
                  label="Preço"
                  fullWidth
                  required
                  variant="outlined"
                  onChange={onChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                  inputProps={{ type: 'number', pattern: '[0-9]*' }}
                />
              )}
            />
            <Controller
              name="stock"
              control={control}
              render={({ field: { onChange } }) => (
                <TextField
                  label="Qntde Estoque"
                  fullWidth
                  required
                  type="number"
                  variant="outlined"
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="sales"
              control={control}
              render={({ field: { onChange } }) => (
                <TextField
                  label="Qntde Vendas"
                  fullWidth
                  required
                  type="number"
                  variant="outlined"
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="avatar"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                <>
                  <Button
                    variant="outlined"
                    onChange={onChange}
                    color={isDirty && error ? 'error' : 'primary'}
                    component="label"
                  >
                    <FileUploadIcon /> Selecione uma imagem
                    <input type="file" hidden />
                  </Button>
                  <Typography component="span">{value}</Typography>
                  {isDirty && error && (
                    <Typography component="span">Selecione uma imagem .png ou .jpg</Typography>
                  )}
                </>
              )}
            />

            <Button type="submit" variant="contained">
              Criar
            </Button>
          </Stack>
        </Paper>
      </Box>
    </form>
  );
};

export default NewProduct;
