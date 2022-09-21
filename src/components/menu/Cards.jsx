import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import styles from './menu.module.css';
import _ from 'lodash';

const Cards = (props) => {
  const theme = useTheme();
  const is600px = useMediaQuery(theme.breakpoints.down('sm'));
  const is600_900px = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const is900px = useMediaQuery(theme.breakpoints.down('md'));
  const menu = props.menu;

  const avatarResp = {
    // avatar: {
    //   width: (theme) => ({
    //     xs: 100,
    //     sm: 100,
    //     md: 128,
    //   }),
    //   height: (theme) => ({
    //     xs: 100,
    //     sm: 100,
    //     md: 128,
    //   }),
    // },
    // box: {
    //   width: (theme) => ({
    //     xs: 160,
    //     sm: 160,
    //     md: 200,
    //   }),
    //   height: (theme) => ({
    //     xs: 200,
    //     sm: 270,
    //     md: 320,
    //   }),
    // },
    // card: {
    //   width: (theme) => ({
    //     xs: 160,
    //     sm: 160,
    //     md: 190,
    //   }),
    //   height: (theme) => ({
    //     xs: 200,
    //     sm: 200,
    //     md: 230,
    //   }),
    // },
  };
  return (
    <Box className={styles.box} mr={4} sx={avatarResp.box}>
      <>
        <Avatar
          alt={menu.name}
          src={menu.URL}
          className={styles.avatar}
          // sx={avatarResp.avatar}
          sx={{ width: 128, height: 128 }}
        />
        <Card variant='outlined' className={styles.card} sx={avatarResp.card}>
          <CardContent className={styles.cardContent}>
            <Typography variant='font18Bold600' component='div'>
              {menu.name}
            </Typography>
            <Typography variant='font14Grey' mt={2}>
              Порц: {menu.portion}
            </Typography>
          </CardContent>
          <CardActions className={styles.cardBtn}>
            <Typography variant='font16Bold700'>{menu.price}₮</Typography>
            <Button
              variant='contained'
              sx={{ fontSize: '0.75rem', padding: '0 4px' }}
            >
              Дэлгэрэнгүй
            </Button>
          </CardActions>
        </Card>
      </>
    </Box>
  );
};

export default Cards;
