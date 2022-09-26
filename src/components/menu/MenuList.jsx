import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { Box, Typography, InputBase, Stack } from '@mui/material';
import styles from './menu.module.css';
import Cards from './Cards';
import FoodAdd from './FoodAdd';
import { useMenuContext } from '../../provider/Menu';
import { LoadingSpinner } from '../../components/Spinner';
import { getDataFromFirestore } from '../../hooks/useFirebase';

const MenuList = () => {
  const { allMenu, setAllMenu, isDownloaded, setIsDownloaded } = useMenuContext();
  const [isLoading, setIsLoading] = useState(true);
  // const params = useParams();

  useEffect(() => {
    const getMenuData = async () => {
      const menuData = await getDataFromFirestore('menu');
      setAllMenu([...menuData]);
      setIsDownloaded(false);
      setIsLoading(false);
    };
    getMenuData();
  }, [isDownloaded]);

  if (isLoading) return <h2 style={{ marginTop: '200px', textAlign: 'center' }}>Түр хүлээнэ үү...</h2>;

  return (
    <div>
      {/* SEARCH BAR */}
      <LoadingSpinner />
      <Box mt={10} className={styles.searchBox} px={5}>
        <Stack direction="row" alignItems="center">
          <Typography variant="font18Bold700" pl={3}>
            Хоолны сан
          </Typography>
          <span className={styles.smallCircle}></span>
          <Typography variant="font18Bold600" color="secondary.grey" pl={3}>
            {allMenu.length}ш
          </Typography>
        </Stack>
        <div className={styles.searchWrapper}>
          <InputBase className={styles.searchInput} placeholder="Хайлт" bgcolor="background.grey" />
        </div>
      </Box>
      {/* MENU LIST */}
      <Box mt={5} className={styles.listBox} bgcolor="background.grey">
        <div className={styles.listBox1}>
          <FoodAdd />
          {!_.isEmpty(allMenu) &&
            _.map(allMenu, (menu, index) => {
              return <Cards addBtn={true} key={index} menuIndex={index} menu={menu} />;
            })}
        </div>
      </Box>
    </div>
  );
};

export default MenuList;
