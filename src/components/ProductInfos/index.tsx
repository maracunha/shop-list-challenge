import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { useGetProductByIdQuery } from '../../common/services/api';
import { IProducts } from '../../common/types';
import { Button, CardContent, Typography, Stack, Paper, Divider } from '@mui/material';

type ProductParams = {
  id: string;
};

const ProductInfos = () => {
  const { id } = useParams<ProductParams>();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (id) {
      navigate(`/edit/${id}`);
    }
  };

  const { data, isLoading } = useGetProductByIdQuery(id || '');

  if (isLoading) {
    return <div>carregando...</div>;
  }

  const [product] = data as IProducts[];

  return (
    <Box display="flex" justifyContent="center" justifyItems="center">
      <Paper elevation={1}>
        <Typography variant="h5" textAlign="center" p={3}>
          {product.nome}
        </Typography>
        <CardContent>
          <Stack direction="row">
            <Typography sx={{ fontSize: 16, pr: 1 }} color="text.primary" gutterBottom>
              Marca:
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {product.marca}
            </Typography>
          </Stack>

          <Stack direction="row">
            <Typography sx={{ fontSize: 16, pr: 1 }} color="text.primary" gutterBottom>
              Preço:
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {`R$ ${product.preco}`}
            </Typography>
          </Stack>

          <Stack direction="row">
            <Typography sx={{ fontSize: 16, pr: 1 }} color="text.primary" gutterBottom>
              Qntde Estoque:
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {product.qt_estoque}
            </Typography>
          </Stack>

          <Stack direction="row">
            <Typography sx={{ fontSize: 16, pr: 1 }} color="text.primary" gutterBottom>
              Qntde Vendas:
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {product.qt_vendas}
            </Typography>
          </Stack>
        </CardContent>

        <Divider />

        <Stack direction="row" justifyContent="space-between" p={2}>
          <Button color="error">Deletar</Button>
          <Button onClick={handleEdit}>Editar</Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ProductInfos;
