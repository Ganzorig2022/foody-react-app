import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { app, db } from '../firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useMenuContext } from '../provider/Menu';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Box, Button } from '@mui/material';
import { GoogleIcon } from '../assets/svg/GoogleIcon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoggedIn, setOpenLogin } = useMenuContext();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
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
        setIsLoggedIn(true);
        navigate('/menu');
        setOpenLogin(false);
        toast.success('Та амжилттай бүртгүүллээ!');
      }
      if (docSnap.exists()) {
        setIsLoggedIn(true);
        setOpenLogin(false);
        navigate('/menu');
        toast.success('Та амжилттай нэвтэрлээ!');
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        m: 5,
        textAlign: 'center',
        fontSize: { xs: 14, sm: 16 },
      }}
    >
      Google эрхээр {location.pathname === '/signup' ? 'бүртгүүлэх' : 'нэвтрэх'}
      <Button onClick={onGoogleClick}>
        <GoogleIcon sx={{ xs: 12 }} size="small" />
      </Button>
    </Box>
  );
};
