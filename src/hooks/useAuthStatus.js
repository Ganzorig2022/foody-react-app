import { useEffect, useState, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useMenuContext } from '../provider/Menu';
import { app } from '../firebase.config';

//imported in PrivateRoute.jsx
export const useAuthStatus = () => {
  const { setIsLoggedIn } = useMenuContext();
  const [checkingStatus, setCheckingStatus] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth(app);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true);
        }
        setCheckingStatus(false);
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted, setIsLoggedIn]);

  return { checkingStatus };
};
