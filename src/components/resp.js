import { styled } from '@mui/material';

export const classes = {
  modalContainer: (theme) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      fontSize: 16,
    },
    [theme.breakpoints.between('sm', 'md')]: { fontSize: 16, p: 0 },
  }),
  modalTypo: (theme) => ({
    textAlign: 'center',
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      textAlign: 'center',
    },
    [theme.breakpoints.between('sm', 'md')]: { fontSize: 24 },
    [theme.breakpoints.between('sm', 'md')]: { fontSize: 24 },
    [theme.breakpoints.up('md')]: { fontSize: 24 },
  }),
  modalTypo1: (theme) => ({
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      fontSize: 14,
    },
    [theme.breakpoints.up('sm')]: { fontSize: 18 },
  }),
  modalTxtField: (theme) => ({
    [theme.breakpoints.down('sm')]: {
      // height: '5px',
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: { fontSize: 18 },
  }),
};
