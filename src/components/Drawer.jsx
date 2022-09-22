import React, { useState } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Stack } from '@mui/material';
import { useMenuContext } from '../provider/Menu';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app, db } from '../firebase.config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuIcon from '@mui/icons-material/Menu';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { Logo } from '../assets/svg/Logo';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(true);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useMenuContext();

  const onClose = () => {
    setOpenDrawer(!openDrawer);
  };

  //==========Navigate to pages when click the button=============
  const onNavigate = (path) => {
    navigate(`${path}`);
  };

  //===============Sign out when click the button=================
  const onLogOut = () => {
    const auth = getAuth(app);
    auth.signOut();
    setIsLoggedIn(false);
    toast.error('Та системээс гарлаа.');
    navigate('/menu');
  };

  return (
    <>
      <Drawer open={openDrawer} onClose={onClose}>
        <List sx={{ background: '#000723', height: '100vh' }}>
          <Stack>
            <Stack>
              <div style={{ padding: '40px' }}>
                <Logo />
              </div>
              <ListItemButton>
                <ListItemIcon sx={{ color: '#fff' }} onClick={() => onNavigate('order')}>
                  <AssignmentOutlinedIcon />
                  <ListItemText sx={{ marginLeft: '10px' }}>Захиалга</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon sx={{ color: '#fff' }} onClick={() => onNavigate('graphic')}>
                  <SignalCellularAltOutlinedIcon />
                  <ListItemText sx={{ marginLeft: '10px' }}>График</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon sx={{ color: '#fff' }} onClick={() => onNavigate('menu')}>
                  <RestaurantMenuOutlinedIcon />
                  <ListItemText sx={{ marginLeft: '10px' }}>Меню</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </Stack>
            <Stack mt={20}>
              <ListItemButton onClick={onLogOut}>
                <ListItemIcon sx={{ color: '#fff', marginTop: 'auto' }}>
                  <LogoutOutlinedIcon />
                  <ListItemText>Гарах</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </Stack>
          </Stack>
        </List>
      </Drawer>
      <IconButton onClick={onClose} sx={{ color: '#000', marginLeft: 'auto' }}>
        <MenuIcon />
      </IconButton>
    </>
  );
};
