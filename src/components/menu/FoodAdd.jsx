import React, { useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
} from '@mui/material';
import styles from './menu.module.css';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import foodAdd from '../../assets/png/foodAdd.png';
import AddModal from './AddModal';

const FoodAdd = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className={styles.box} mr={4}>
      <Avatar
        alt='add food'
        src={foodAdd}
        className={styles.avatar}
        sx={{ width: 128, height: 128 }}
      />
      <Card variant='outlined' className={styles.card}>
        <CardContent className={styles.cardContent1}>
          <Typography variant='font18Bold600' component='div'>
            Шинэ хоол нэмэх
          </Typography>
        </CardContent>
        <CardActions className={styles.cardBtn}>
          <Button onClick={handleOpen}>
            <AddCircleRoundedIcon
              className={styles.addBtn}
              color='primary'
              fontSize='large'
            />
          </Button>
        </CardActions>
        <AddModal
          onOpen={open}
          onOpenHandler={handleOpen}
          onCloseHandler={handleClose}
        />
      </Card>
    </Box>
  );
};

export default FoodAdd;
