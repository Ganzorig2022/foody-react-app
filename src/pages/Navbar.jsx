import { Fragment } from 'react';
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
import { useMenuContext } from '../provider/Menu';
import { DrawerComp } from '../components';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import styles from '../pages/navbar.module.css';

export const Navbar = () => {
  const { setOpenLogin, isLoggedIn } = useMenuContext();
  const theme = useTheme();
  const is600px = useMediaQuery(theme.breakpoints.down('sm'));
  const is600_900px = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const is900px = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpen = () => {
    setOpenLogin(true);
  };

  const appStyle = {
    background: '#ffffff',
    color: '#000',
    boxShadow: 'none',
    borderBottom: '1px solid #DFE0EB',
  };
  const boxStyle = {
    display: 'flex',
    alignItems: 'center',
    borderLeft: '1px solid #DFE0EB',
    marginLeft: '10px',
  };

  return (
    <Fragment>
      <AppBar sx={appStyle}>
        <Toolbar>
          <DrawerComp />
          <div className={styles.container}>
            <div className={styles.lNav}>
              <Typography
                variant='bold700'
                sx={{ fontSize: { xs: 16, sm: 20, md: 24, lg: 32 } }}
              >
                Захиалга
              </Typography>
            </div>
            <div className={styles.rNav}>
              <SearchOutlinedIcon />
              <NotificationsActiveOutlinedIcon sx={{ marginLeft: '10px' }} />
              <Box sx={boxStyle}>
                {!is900px && (
                  <Typography sx={{ marginLeft: '10px' }} variant='bold600'>
                    Н.Ганзориг
                  </Typography>
                )}
                <Avatar
                  ml={2}
                  alt='Ganzo'
                  src='https://randomuser.me/api/portraits/women/79.jpg'
                  style={{ marginLeft: '10px' }}
                />
              </Box>
              <Button
                variant='contained'
                onClick={handleOpen}
                style={{ marginLeft: '10px' }}
                disabled={isLoggedIn && true}
                sx={is600px && { padding: '6px 0px' }}
              >
                {is600px ? (
                  <PersonAddAltOutlinedIcon />
                ) : isLoggedIn ? (
                  'Нэвтэрсэн'
                ) : (
                  'Бүртгүүлэх'
                )}
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};
