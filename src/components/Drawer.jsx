import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { Logo } from '../assets/svg/Logo';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const navigate = useNavigate();

  const onClose = () => {
    setOpenDrawer(!openDrawer);
  };

  const onNavigate = (path) => {
    if (path === 'order') navigate('/order');
    if (path === 'graphic') navigate('/graphic');
    if (path === 'menu') navigate('/menu');
  };

  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={onClose}>
        <List sx={{ background: '#000723', height: '100%' }}>
          <div style={{ padding: '40px' }}>
            <Logo />
          </div>
          <ListItemButton>
            <ListItemIcon
              sx={{ color: '#fff' }}
              onClick={() => onNavigate('order')}
            >
              <AssignmentOutlinedIcon />
              <ListItemText sx={{ marginLeft: '10px' }}>Захиалга</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon
              sx={{ color: '#fff' }}
              onClick={() => onNavigate('graphic')}
            >
              <SignalCellularAltOutlinedIcon />
              <ListItemText sx={{ marginLeft: '10px' }}>График</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon
              sx={{ color: '#fff' }}
              onClick={() => onNavigate('menu')}
            >
              <RestaurantMenuOutlinedIcon />
              <ListItemText sx={{ marginLeft: '10px' }}>Меню</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon sx={{ color: '#fff', marginTop: '400px' }}>
              <LogoutOutlinedIcon />
              <ListItemText>Гарах</ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton onClick={onClose} sx={{ color: '#000', marginLeft: 'auto' }}>
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
