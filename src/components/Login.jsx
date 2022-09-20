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

const Login = () => {
  const auth = getAuth(app);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>
        Нэвтрэх
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography variant='h4'>Нэвтрэх</Typography>
          <Stack spacing={2} direction='column'>
            <TextField
              name='email'
              type='email'
              inputRef={emailRef}
              placeholder='enter email'
              label='Email'
            />
            <TextField
              name='password'
              type='password'
              inputRef={passRef}
              placeholder='password'
              label='Password'
            />
            <Button variant='contained' onClick={submitHandle}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default Login;
