import { useEffect, useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
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
import { IFormNewProduct, IFormNewProductPayload, IProducts } from '../../common/types';
import { useGetProductByIdQuery } from '../../common/services/api';

const NewProduct = () => {
  const [createProduct, { isSuccess }] = useCreateProductMutation();
  const [product, setProduct] = useState<IProducts>();
  const navigate = useNavigate();

  const params = useParams();
  const [path, id] = params['*']?.split('/') ?? [];

  const isEditing = path === 'edit';
  const { data } = useGetProductByIdQuery(id, { skip: !isEditing });

  useEffect(() => {
    if (isEditing && data) {
      setProduct(data[0]);
    }
  }, [isEditing, data]);

  const { handleSubmit, control, watch, setValue, setError, reset } = useForm({
    defaultValues: {
      name: product?.nome || '',
      avatar: product?.avatar || '',
      price: product?.preco || 0,
      stock: product?.qt_estoque || 0,
      sales: product?.qt_vendas || 0,
      brand: product?.marca || '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    reset({
      name: product?.nome || '',
      avatar: product?.avatar || '',
      price: product?.preco || 0,
      stock: product?.qt_estoque || 0,
      sales: product?.qt_vendas || 0,
      brand: product?.marca || '',
    });
  }, [product, reset]);

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

    const body = {
      nome: data.name,
      avatar: image,
      preco: data.price,
      qt_estoque: data.stock,
      qt_vendas: data.sales,
      marca: data.brand,
    };

    await createProduct({ body, isEditing, id });
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
              render={({ field: { onChange, value } }) => (
                <Grid item xs={3}>
                  <TextField
                    label="Nome"
                    value={value}
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
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Marca"
                  value={value}
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
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Preço"
                  value={value}
                  fullWidth
                  required
                  variant="outlined"
                  type="number"
                  onChange={onChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                  inputProps={{ pattern: '[0-9]*' }}
                />
              )}
            />
            <Controller
              name="stock"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Qntde Estoque"
                  value={value}
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
              render={({ field: { onChange, value } }) => (
                <TextField
                  label="Qntde Vendas"
                  value={value}
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
              {isEditing ? 'Editar' : 'Criar'}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </form>
  );
};

export default NewProduct;
