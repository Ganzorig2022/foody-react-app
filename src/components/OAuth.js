import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { app, db } from '../firebase.config';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
} from 'firebase/auth';
import { useMenuContext } from '../provider/Menu';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Box, Button } from '@mui/material';
import { GoogleIcon } from '../assets/svg/GoogleIcon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useMenuContext();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user.uid);
      // Check for user
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // If user, doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        toast.success('Та амжилттай бүртгүүллээ!');
      }
      if (docSnap.exists()) {
        setIsLoggedIn(true);
        toast.success('Та амжилттай нэвтэрлээ!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        m: 5,
      }}
    >
      Google эрхээр {location.pathname === '/signup' ? 'бүртгүүлэх' : 'нэвтрэх'}
      <Button onClick={onGoogleClick}>
        <GoogleIcon />
      </Button>
    </Box>
  );
};
