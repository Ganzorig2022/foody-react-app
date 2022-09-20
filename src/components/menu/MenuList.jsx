import React, { useEffect, useState } from 'react';
import { Box, Typography, InputBase, Stack } from '@mui/material';
import styles from './menu.module.css';
import Cards from './Cards';
import FoodAdd from './FoodAdd';
import { useMenuContext } from '../../provider/Menu';
import _ from 'lodash';
import LoadingSpinner from '../../components/Spinner';
import { getMenuFromFirestore } from '../../hooks/useFirebase';

const MenuList = () => {
  const { allMenu, setAllMenu, isDownloaded, setIsDownloaded } =
    useMenuContext();

  useEffect(() => {
    const getMenuData = async () => {
      const menuData = await getMenuFromFirestore();
      setAllMenu([...menuData]);
      setIsDownloaded(false);
    };
    getMenuData();
  }, [isDownloaded]);

  return (
    <div className={styles.mainContainer}>
      {/* SEARCH BAR */}
      <LoadingSpinner />
      <Box mt={10} className={styles.searchBox} px={5}>
        <Stack direction='row' alignItems='center'>
          <Typography variant='font18Bold700' pl={3}>
            Хоолны сан
          </Typography>
          <span className={styles.smallCircle}></span>
          <Typography variant='font18Bold600' color='secondary.grey' pl={3}>
            {allMenu.length}ш
          </Typography>
        </Stack>
        <div className={styles.searchWrapper}>
          <InputBase
            className={styles.searchInput}
            placeholder='Хайлт'
            bgcolor='background.grey'
          />
        </div>
      </Box>
      {/* MENU LIST */}
      <Box mt={5} className={styles.listBox} bgcolor='background.grey'>
        <div className={styles.listBox1}>
          <FoodAdd />
          {!_.isEmpty(allMenu) &&
            allMenu.map((menu, index) => {
              return (
                <Cards
                  addBtn={true}
                  key={index}
                  menuIndex={index}
                  menu={menu}
                />
              );
            })}
        </div>
      </Box>
    </div>
  );
};

export default MenuList;
