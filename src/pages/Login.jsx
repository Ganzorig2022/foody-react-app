import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
} from '@mui/material';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { app } from '../firebase.config';
import { useMenuContext } from '../provider/Menu';

export const Login = () => {
  const auth = getAuth(app);
  const { isLoggedIn, setIsLoggedIn, openLogin, setOpenLogin } =
    useMenuContext();

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

  const emailRef = useRef(null);
  const passRef = useRef(null);

  function submitHandle() {
    const email = emailRef.current.value;
    sendEmailToFirebase(email);
  }

  const sendEmailToFirebase = async (email) => {
    //http://localhost:3000/order
    const actionCodeSettings = {
      url: 'http://localhost:3000/order',
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert('Та амжилттай нэвтэрлээ!');
    } catch (error) {
      alert(error.message);
    }
  };
  const handleClose = () => {
    setOpenLogin(false);
  };
  return (
    <div>
      <Modal
        open={openLogin}
        onClose={handleClose}
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
                name='email'
                type='email'
                inputRef={emailRef}
                placeholder='enter email'
              />
              <Stack>
                <Typography variant='font18Bold700' my={3}>
                  Password
                </Typography>
                <TextField
                  name='password'
                  type='password'
                  inputRef={passRef}
                  placeholder='password'
                />
              </Stack>
              <Box>
                <Button
                  variant='contained'
                  onClick={submitHandle}
                  sx={{ width: '100%', marginTop: '10px' }}
                >
                  Бүртгүүлэх
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
