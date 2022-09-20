import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, makeStyles } from '@mui/material';

import styles from './menu.module.css';

const MenuTabs = () => {
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      className={styles.tabWrapper}
      sx={{
        borderBottom: '1px solid #DFE0EB',
        width: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor='main'
        aria-label='secondary tabs example'
        className={styles.tabContainer}
      >
        <Tab
          value='one'
          label='2 сарын 11'
          sx={{ textTransform: 'lowercase', fontSize: '18px' }}
        />
        <Tab
          value='two'
          label='2 сарын 18'
          sx={{ textTransform: 'lowercase', fontSize: '18px' }}
        />
        <Tab
          value='three'
          label='2 сарын 25'
          sx={{ textTransform: 'lowercase', fontSize: '18px' }}
        />
      </Tabs>
      <Typography
        color='primary.main'
        variant='font18'
        sx={{
          marginRight: (theme) => theme.spacing(5),
        }}
      >
        Нийт: 8
      </Typography>
    </Box>
  );
};

export default MenuTabs;
