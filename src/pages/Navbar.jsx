import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
  Box,
  Button,
} from '@mui/material';
import DrawerComp from '../components/Drawer';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import styles from '../pages/navbar.module.css';
import { useMenuContext } from '../provider/Menu';

export const Navbar = () => {
  const { openLogin, setOpenLogin } = useMenuContext();
  const theme = useTheme();

  // const [sidebarOpen, setSidebarOpen] = useState(true);

  // const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  const appStyle = {
    background: '#ffffff',
    color: '#000',
    boxShadow: 'none',
    borderBottom: '1px solid #DFE0EB',
  };

  const handleOpen = () => {
    setOpenLogin(true);
  };
  return (
    <React.Fragment>
      <AppBar sx={appStyle}>
        <Toolbar>
          <DrawerComp />
          <div className={styles.container}>
            <div className={styles.lNav}>
              <Typography variant='font32'>Захиалга</Typography>
            </div>
            <div className={styles.rNav}>
              <SearchOutlinedIcon />
              <NotificationsActiveOutlinedIcon sx={{ marginLeft: '10px' }} />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderLeft: '1px solid #DFE0EB',
                  marginLeft: '10px',
                }}
              >
                <Typography sx={{ marginLeft: '10px' }} variant='bold600'>
                  Н.Ганзориг
                </Typography>
                <Avatar
                  sx={{ marginLeft: '10px' }}
                  alt='Ganzo'
                  src='https://randomuser.me/api/portraits/women/79.jpg'
                />
              </Box>
              <Button
                variant='contained'
                onClick={handleOpen}
                sx={{ marginLeft: '10px' }}
              >
                Бүртгүүлэх
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

// export const Navbar = () => {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position='static'>
//         <Toolbar>
//           <IconButton
//             size='large'
//             edge='start'
//             color='inherit'
//             aria-label='menu'
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
//             News
//           </Typography>
//           <Button color='inherit'>Login</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };
