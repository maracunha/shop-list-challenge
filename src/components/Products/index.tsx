import {
  Paper,
  Stack,
  Pagination,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Button,
} from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetProductsQuery } from '../../common/services/api';

interface ItemProps {
  text: string;
  imgUrl: string;
}

const Item = ({ text, imgUrl }: ItemProps) => {
  const handleViewProduct = () => {
    console.log('this is a full prod');
  };

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
            <Avatar>{imgUrl}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={text} />
        </ListItem>
      </List>
    </Paper>
  );
};

export default function PaginationControlled() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetProductsQuery(page);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (!data || isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">seach bar lindoo</Typography>
        <Button>Criar</Button>
      </Box>

      <Stack spacing={2}>
        {data.map((item) => (
          <Item key={item.id} text={item.nome} imgUrl={item.avatar} />
        ))}
      </Stack>

      <Stack spacing={2} mt={3}>
        <Pagination count={7} page={page} onChange={handleChange} />
      </Stack>
    </Box>
  );
}
