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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { OAuth, LoadingSpinner, classes } from '../components';
import { app } from '../firebase.config';
import { useMenuContext } from '../provider/Menu';
import { checkEmail, checkPassword } from '../utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, openLogin, setOpenLogin, setIsSpinning } = useMenuContext();
  const [showPassword, setShowPassword] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const theme = useTheme();
  const is600px = useMediaQuery(theme.breakpoints.down('sm'));

  //===============1. Sign In with firebase/auth when click Login button==============
  const onSubmitHandler = async () => {
    setIsSpinning(true);
    setOpenLogin(false);

    const email = emailRef.current.value;
    const password = passRef.current.value;
    if (emailIsValid && passwordIsValid) {
      try {
        const auth = getAuth(app);

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
          setIsSpinning(false);
          setIsLoggedIn(true);
          toast.success('Та амжилттай нэвтэрлээ!');
          navigate('/menu');
        }
      } catch (error) {
        toast.error('Something went wrong with registration');
      }
    }
  };

  //===================Helper functions====================================
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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={classes.modalContainer}>
          <Stack p={4}>
            <Typography mb={5} sx={classes.modalTypo}>
              НЭВТРЭХ
            </Typography>
            <Stack spacing={2} direction="column">
              <Typography sx={classes.modalTypo1} mb={3}>
                Email
              </Typography>
              <TextField
                name="email"
                type="email"
                inputRef={emailRef}
                placeholder="enter email"
                size={is600px && 'small'}
                sx={classes.modalTxtField}
                onBlur={emailChecker}
              />
              {emailIsValid === false && (
                <Typography variant="font12" color="secondary.main">
                  Имэйлд @ агуулсан байх ёстой.'
                </Typography>
              )}
              <Stack>
                <Typography sx={classes.modalTypo1} my={3}>
                  Password
                </Typography>
                <OutlinedInput
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  size={is600px && 'small'}
                  inputRef={passRef}
                  placeholder="password"
                  onBlur={passwordChecker}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {passwordIsValid === false && (
                  <Typography variant="font12" color="secondary.main">
                    Хамгийн багадаа 6н оронтой тоо.'
                  </Typography>
                )}
                <Typography variant="font14" my={3} onClick={() => navigate('/forgot-password')} color="primary.forgot">
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
                <Button variant="contained" onClick={onSubmitHandler} sx={{ width: '100%', marginTop: '10px' }}>
                  Нэвтрэх
                </Button>
                <Divider textAlign="center" sx={{ mt: 5 }}>
                  эсвэл{' '}
                </Divider>
                <OAuth />{' '}
                <Button variant="outlined" onClick={() => navigate('/signup')}>
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
