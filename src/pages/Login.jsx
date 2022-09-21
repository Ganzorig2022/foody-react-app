import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
  Divider,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { OAuth } from '../components/OAuth';
import { app, db } from '../firebase.config';
import { useMenuContext } from '../provider/Menu';
import LoadingSpinner from '../components/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, openLogin, setOpenLogin, setIsSpinning } =
    useMenuContext();
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  //===============1. Sign In with firebase/auth when click Login button==============
  const onSubmitHandler = async () => {
    setIsSpinning(true);
    setOpenLogin(false);

    const email = emailRef.current.value;
    const password = passRef.current.value;

    try {
      const auth = getAuth(app);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        setIsSpinning(false);
        setIsLoggedIn(true);
        toast.success('Та амжилттай нэвтэрлээ!');
        navigate('/menu');
      }
    } catch (error) {
      toast.error('Something went wrong with registration');
    }
  };

  //======================Close login modal=========================================
  const loginModalCloseHandler = () => {
    setOpenLogin(false);
  };

  //=======================Toggle show password=================================
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //===============================================================
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
  };

  return (
    <div>
      <LoadingSpinner />
      <Modal
        open={openLogin}
        onClose={loginModalCloseHandler}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Stack p={4}>
            <Typography variant='h4' mb={5} sx={{ textAlign: 'center' }}>
              НЭВТРЭХ
            </Typography>
            <Stack spacing={2} direction='column'>
              <Typography variant='font18Bold700' mb={3}>
                Email
              </Typography>
              <TextField
                name='email'
                type='email'
                inputRef={emailRef}
                placeholder='enter email'
              />
              <Stack>
                <Typography variant='font18Bold700' my={3}>
                  Password
                </Typography>
                <OutlinedInput
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  inputRef={passRef}
                  placeholder='password'
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Typography
                  variant='font14'
                  my={3}
                  onClick={() => navigate('/forgot-password')}
                  color='primary.forgot'
                >
                  Forgot Password?
                </Typography>
              </Stack>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant='contained'
                  onClick={onSubmitHandler}
                  sx={{ width: '100%', marginTop: '10px' }}
                >
                  Нэвтрэх
                </Button>
                <Divider textAlign='center' sx={{ mt: 5 }}>
                  эсвэл{' '}
                </Divider>
                <OAuth />{' '}
                <Button variant='outlined' onClick={() => navigate('/signup')}>
                  Бүртгүүлэх <ArrowRightOutlinedIcon />
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};