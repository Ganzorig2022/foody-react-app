import React from 'react';
import styles from './menu.module.css';
import { Box } from '@mui/material';

const MenuOrder = () => {
  return (
    <div className={styles.wrapper}>
      <Box mt={5} className={styles.listBox}>
        <div style={{ display: 'flex' }}></div>
      </Box>
    </div>
  );
};

export default MenuOrder;
