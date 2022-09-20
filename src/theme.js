import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useMemo } from 'react';

const Theme = createTheme({
  spacing: 4,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1280,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#66B60F',
      light: '#75ce9f',
      dark: '#01a66f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
      contrastText: '#fff',
      darkBlue: '#000723',
      grey: '#a0a2a8',
      black: '#000',
    },
    background: {
      paper: '#fff',
      default: '#212121',
      grey: '#F5F5F7',
    },
    text: {
      primary: '#000',
      secondary: '#fff',
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: 'Raleway',
    font32: {
      fontSize: 32,
      fontWeight: 700,
    },
    font24Bold700: {
      fontSize: 24,
      fontWeight: 700,
    },
    font20Bold700: {
      fontSize: 20,
      fontWeight: 700,
    },
    font18: {
      fontSize: 18,
    },
    font18Bold600: {
      fontSize: 18,
      fontWeight: 600,
    },
    font18Bold700: {
      fontSize: 18,
      fontWeight: 700,
    },
    font16Bold700: {
      fontSize: 16,
      fontWeight: 700,
    },
    font16Bold600: {
      fontSize: 16,
      fontWeight: 700,
    },
    font16Bold500Grey: {
      fontSize: 16,
      fontWeight: 500,
      color: '#a0a2a8',
    },
    font14: {
      fontSize: 14,
    },
    font14Grey: {
      fontSize: 14,
      color: '#a0a2a8',
    },
    font14DarkBLue: {
      fontSize: 14,
      color: '#000723',
    },
    bold600: {
      fontWeight: 600,
    },
  },
});

export const CustomTheme = ({ children }) => {
  return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
};

// m - margin p - padding

// Where sides is one of:

// t - margin-top or padding-top

// b - margin-bottom or padding-bottom

// l - margin-left or padding-left

// r - margin-right or padding-right

// x - both *-left and *-right

// y - both *-top and *-bottom

//<Typography variant='font14DarkBLue' ml={2.5}>

//  <InputBase
//    bgcolor='background.grey'
//  />
