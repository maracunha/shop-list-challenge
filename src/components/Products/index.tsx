import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Stack,
  Pagination,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Button,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useGetProductsQuery } from '../../common/services/api';
import { IProducts } from '../../common/types';
import SearchItem from '../SearchItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Item = ({ item }: { item: IProducts }) => {
  const navigate = useNavigate();
  const handleViewProduct = () => {
    navigate(`/products/${item.id}`, { replace: true });
  };

  const { nome, avatar, preco, marca, qt_estoque } = item;

  const description = `${nome} | Marca: ${marca} | Preço: ${preco} | Estoque: ${qt_estoque}`;

  return (
    <Paper>
      <List>
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="product-image" onClick={handleViewProduct}>
              <VisibilityIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar>{avatar}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={description} />
        </ListItem>
      </List>
    </Paper>
  );
};

const Products = () => {
  const [page, setPage] = useState(1);
  const search = useSelector((state: RootState) => state.products.searchItem);

  const { data, isLoading } = useGetProductsQuery({ page, search });

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  console.log({ search });

  if (!data || isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Box>
      <Box display="flex" mb={4} justifyContent="space-between">
        <SearchItem />
        <Button component={Link} variant="contained" to="/new">
          Criar Produto
        </Button>
      </Box>

      <Stack spacing={2}>
        {data.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </Stack>

      <Stack spacing={2} mt={3}>
        <Pagination count={7} page={page} onChange={handleChange} />
      </Stack>
    </Box>
  );
};

export default Products;
