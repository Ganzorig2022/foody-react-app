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
  return (
    <Box className={styles.box} mr={4}>
      <>
        <Avatar
          alt={props.menu.name}
          src='https://www.simplyrecipes.com/thmb/Dv5-aNshkZf9LHJkGt6D-_62dhw=/2519x1679/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Kimchi-Stew-LEAD-9-d258c9eaa50c442092c368e9769b77dc.jpg'
          className={styles.avatar}
          sx={{ width: 128, height: 128 }}
        />
        <Card variant='outlined' className={styles.card}>
          <CardContent className={styles.cardContent}>
            <Typography variant='font18Bold600' component='div'>
              Кимчи жигэ
            </Typography>
            <Typography variant='font14Grey' mt={2}>
              Порц:1
            </Typography>
          </CardContent>
          <CardActions className={styles.cardBtn}>
            <Typography variant='font16Bold700'>11,700₮</Typography>
            <Button>
              {props.addBtn ? (
                <AddCircleRoundedIcon className={styles.addBtn} />
              ) : (
                <RemoveRoundedIcon className={styles.removeBtn} />
              )}
            </Button>
          </CardActions>
        </Card>
      </>
    </Box>
  );
};

export default Cards;
