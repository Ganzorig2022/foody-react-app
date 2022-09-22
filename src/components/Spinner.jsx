import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useMenuContext } from '../provider/Menu';

export const LoadingSpinner = () => {
  const { isSpinning } = useMenuContext();
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSpinning}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};
