import { useState, MouseEvent } from 'react';
import { Avatar, Typography, Box } from '@mui/material';

import { Menu, MenuItem, ListItemIcon, IconButton, Tooltip } from '@mui/material';
import Logout from '@mui/icons-material/Logout';

import { useAuth } from '../../common/hooks/auth';
import { useAppSelector } from '../../common/hooks/reduxHooks';

const HeaderInfos = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { logout } = useAuth();
  const { value: userState } = useAppSelector((state) => state.user);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', mr: 2 }}>
      <Typography variant="h6">
      { `${userState.nome} ${userState.sobrenome}` }
      </Typography>
        <Tooltip title="Configuracão da conta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={userState.image} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default HeaderInfos;
