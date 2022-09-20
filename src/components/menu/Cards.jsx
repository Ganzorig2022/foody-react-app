import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
} from '@mui/material';
import { useMenuContext } from '../../provider/Menu';
import styles from './menu.module.css';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import _ from 'lodash';

const Cards = (props) => {
  const menu = props.menu;
  return (
    <Box className={styles.box} mr={4}>
      <>
        <Avatar
          alt={menu.name}
          src={menu.URL}
          className={styles.avatar}
          sx={{ width: 128, height: 128 }}
        />
        <Card variant='outlined' className={styles.card}>
          <CardContent className={styles.cardContent}>
            <Typography variant='font18Bold600' component='div'>
              {menu.name}
            </Typography>
            <Typography variant='font14Grey' mt={2}>
              Порц:1
            </Typography>
          </CardContent>
          <CardActions className={styles.cardBtn}>
            <Typography variant='font16Bold700'>{menu.price}₮</Typography>
            <Button
              variant='contained'
              sx={{ fontSize: '0.75rem', padding: '0 4px' }}
            >
              {/* {props.addBtn ? (
                <AddCircleRoundedIcon className={styles.addBtn} />
              ) : (
                <RemoveRoundedIcon className={styles.removeBtn} />
              )} */}
              Дэлгэрэнгүй
            </Button>
          </CardActions>
        </Card>
      </>
    </Box>
  );
};

export default Cards;
