import React from 'react';
import Cards from './Cards';
import styles from './menu.module.css';
import { Box, Typography, InputBase, Stack } from '@mui/material';

const MenuOrder = () => {
  return (
    <div className={styles.wrapper}>
      <Box mt={5} className={styles.listBox}>
        <div style={{ display: 'flex' }}>
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>
      </Box>
    </div>
  );
};

export default MenuOrder;
