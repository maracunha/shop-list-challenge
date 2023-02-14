import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Box, Button, CardContent, Typography, Stack, Paper, Divider } from '@mui/material';
import { useDeleteProductMutation, useGetProductByIdQuery } from '../../common/services/api';
import { IProducts } from '../../common/types';
import Modal from '../Modal';

type ProductParams = {
  id: string;
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #ff8000',
  boxShadow: 24,
  p: 4,
};

const ProductInfos = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams<ProductParams>();
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (id) {
      navigate(`/edit/${id}`);
    }
  };

  const handleDeleteProduct = async () => {
    if (id) {
      await deleteProduct(id);
    }

    setShowModal(false);
    navigate('/products');
  };

  const { data, isLoading } = useGetProductByIdQuery(id || '');

  if (isLoading) {
    return <div>carregando...</div>;
  }

  const [product] = data as IProducts[];

  return (
    <ClickAwayListener onClickAway={() => setShowModal(false)}>
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
          {showModal && (
            <Modal>
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Tem certeza que deseja apagar esse produto?
                </Typography>
                <Stack direction="row" justifyContent="space-between" p={2}>
                  <Button color="error" onClick={handleDeleteProduct}>
                    Deletar
                  </Button>
                  <Button onClick={() => setShowModal(false)}>Cancelar</Button>
                </Stack>
              </Box>
            </Modal>
          )}

          <Stack direction="row" justifyContent="space-between" p={2}>
            <Button color="error" onClick={() => setShowModal(!showModal)}>
              Deletar
            </Button>
            <Button onClick={handleEdit}>Editar</Button>
          </Stack>
        </Paper>
      </Box>
    </ClickAwayListener>
  );
};

export default ProductInfos;
