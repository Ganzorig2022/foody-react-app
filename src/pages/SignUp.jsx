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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { OAuth, classes, LoadingSpinner } from '../components';
import { app, db } from '../firebase.config';
import { useMenuContext } from '../provider/Menu';
import { checkEmail, checkPassword } from '../utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const SignUp = () => {
  const [emailIsValid, setEmailIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();
  const { setIsLoggedIn, openLogin, setOpenLogin, setIsSpinning } =
    useMenuContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);
  const passRef = useRef(null);
  const theme = useTheme();
  const is600px = useMediaQuery(theme.breakpoints.down('sm'));

  const emailChecker = () => {
    const result = checkEmail(emailRef.current.value);
    if (result) setEmailIsValid(true);
    if (!result) setEmailIsValid(false);
  };
  const passwordChecker = () => {
    const result = checkPassword(passRef.current.value);
    if (result) setPasswordIsValid(true);
    if (!result) setPasswordIsValid(false);
  };

  //=============1. Create user on firebase/auth==============
  const onSubmitHandler = async () => {
    const email = emailRef.current.value;
    const password = passRef.current.value;
    if (emailIsValid && passwordIsValid) {
      try {
        const auth = getAuth(app);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
          email: email,
          password: password,
          createdAt: serverTimestamp(),
        });

        setIsSpinning(false);
        setIsLoggedIn(true);
        toast.success('Та амжилттай бүртгүүллээ!');
        navigate('/menu');
      } catch (error) {
        toast.error(error.message);
      }
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

  return (
    <div>
      <LoadingSpinner />
      <Modal
        open={openLogin}
        onClose={loginModalCloseHandler}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={classes.modalContainer}>
          <Stack p={4}>
            <Typography mb={5} sx={classes.modalTypo}>
              БҮРТГҮҮЛЭХ
            </Typography>
            <Stack spacing={2} direction='column'>
              <Typography sx={classes.modalTypo1} mb={3}>
                Email
              </Typography>
              <TextField
                error={emailIsValid && false}
                onBlur={emailChecker}
                name='email'
                type='email'
                inputRef={emailRef}
                placeholder='enter email'
                size={is600px && 'small'}
              />{' '}
              {emailIsValid === false && (
                <Typography variant='font12' color='secondary.main'>
                  Имэйлд @ агуулсан байх ёстой.'
                </Typography>
              )}
              <Stack>
                <Typography variant='font18Bold700' my={3}>
                  Password
                </Typography>
                <OutlinedInput
                  name='password'
                  error={passwordIsValid && false}
                  type={showPassword ? 'text' : 'password'}
                  inputRef={passRef}
                  size={is600px && 'small'}
                  onBlur={passwordChecker}
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
                {passwordIsValid === false && (
                  <Typography variant='font12' color='secondary.main'>
                    Хамгийн багадаа 6н оронтой тоо.'
                  </Typography>
                )}
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
                  Бүртгүүлэх
                </Button>
                <Divider textAlign='center' sx={{ mt: 5 }}>
                  эсвэл{' '}
                </Divider>
                <OAuth />{' '}
                <Button variant='outlined' onClick={() => navigate('/login')}>
                  Нэвтрэх <ArrowRightOutlinedIcon />
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
