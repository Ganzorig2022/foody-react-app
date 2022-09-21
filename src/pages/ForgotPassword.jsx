import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
} from '@mui/material';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app, db } from '../firebase.config';
import { useMenuContext } from '../provider/Menu';
import LoadingSpinner from '../components/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ForgotPassword = () => {
  const { setIsLoggedIn, openLogin, setOpenLogin, setIsSpinning } =
    useMenuContext();
  const navigate = useNavigate();

  const emailRef = useRef(null);

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
        onClose={ModalCloseHandler}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Stack p={4}>
            <Typography variant='h4' mb={5} sx={{ textAlign: 'center' }}>
              НУУЦ ҮГ СЭРГЭЭХ
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
