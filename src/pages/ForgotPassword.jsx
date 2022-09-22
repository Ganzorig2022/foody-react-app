import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app, db } from '../firebase.config';
import { useMenuContext } from '../provider/Menu';
import { LoadingSpinner, classes } from '../components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkEmail } from '../utils';

export const ForgotPassword = () => {
  const { setIsLoggedIn, openLogin, setOpenLogin, setIsSpinning } =
    useMenuContext();
  const [emailIsValid, setEmailIsValid] = useState();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const theme = useTheme();
  const is600px = useMediaQuery(theme.breakpoints.down('sm'));

  const onSubmitHandler = async () => {
    setIsSpinning(true);
    setOpenLogin(false);

    const email = emailRef.current.value;

    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);
      setIsSpinning(false);
      toast.success('Имэйл илгээгдлээ! Та имэйлээ шалгана уу.');
      navigate('/menu');
    } catch (error) {
      toast.error('Could not send reset email');
    }
  };

  //======================Close login modal=========================================
  const ModalCloseHandler = () => {
    setOpenLogin(false);
  };
  const emailChecker = () => {
    const result = checkEmail(emailRef.current.value);
    if (result) setEmailIsValid(true);
    if (!result) setEmailIsValid(false);
  };
  return (
    <div>
      <LoadingSpinner />
      <Modal
        open={openLogin}
        onClose={ModalCloseHandler}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={classes.modalContainer}>
          <Stack p={4}>
            <Typography mb={5} sx={classes.modalTypo}>
              НУУЦ ҮГ СЭРГЭЭХ
            </Typography>
            <Stack spacing={2} direction='column'>
              <Typography sx={classes.modalTypo1} mb={3}>
                Email
              </Typography>
              <TextField
                name='email'
                type='email'
                inputRef={emailRef}
                placeholder='enter email'
                onBlur={emailChecker}
                size={is600px && 'small'}
              />{' '}
              {emailIsValid === false && (
                <Typography variant='font12' color='secondary.main'>
                  Имэйлд @ агуулсан байх ёстой.'
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
                Имэйл илгээх
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
