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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { OAuth } from '../components/OAuth';
import { app, db } from '../firebase.config';
import { useMenuContext } from '../provider/Menu';
import checkEmail from '../utils/checkEmail';
import checkPassword from '../utils/checkPassword';
import LoadingSpinner from '../components/Spinner';
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
              БҮРТГҮҮЛЭХ
            </Typography>
            <Stack spacing={2} direction='column'>
              <Typography variant='font18Bold700' mb={3}>
                Email
              </Typography>
              <TextField
                error={emailIsValid && false}
                onBlur={emailChecker}
                name='email'
                type='email'
                inputRef={emailRef}
                placeholder='enter email'
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
