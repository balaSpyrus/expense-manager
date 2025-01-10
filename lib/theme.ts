import { createTheme } from '@mui/material/styles';

const lightPalette = {
    background: {
        default: 'rgb(255, 255, 255)',
        paper: 'rgb(245, 245, 245)',
    },
    text: {
        primary: 'rgb(23, 23, 23)',
        secondary: 'rgb(100, 100, 100)',
    },
    primary: {
        main: 'rgb(23, 23, 23)',
        light: 'rgb(100, 100, 100)',
        dark: 'rgb(0, 0, 0)',
    },
    secondary: {
        main: 'rgb(0, 123, 255)',
        light: 'rgb(102, 178, 255)',
        dark: 'rgb(0, 82, 204)',
    },
    error: {
        main: 'rgb(211, 47, 47)',
        light: 'rgb(239, 83, 80)',
        dark: 'rgb(183, 28, 28)',
    },
    warning: {
        main: 'rgb(255, 152, 0)',
        light: 'rgb(255, 183, 77)',
        dark: 'rgb(245, 124, 0)',
    },
    info: {
        main: 'rgb(3, 169, 244)',
        light: 'rgb(77, 208, 225)',
        dark: 'rgb(2, 136, 209)',
    },
    success: {
        main: 'rgb(76, 175, 80)',
        light: 'rgb(129, 199, 132)',
        dark: 'rgb(56, 142, 60)',
    },
};

const darkPalette = {
    background: {
        default: 'rgb(10, 10, 10)',
        paper: 'rgb(30, 30, 30)',
    },
    text: {
        primary: 'rgb(237, 237, 237)',
        secondary: 'rgb(180, 180, 180)',
    },
    primary: {
        main: 'rgb(237, 237, 237)',
        light: 'rgb(180, 180, 180)',
        dark: 'rgb(255, 255, 255)',
    },
    secondary: {
        main: 'rgb(0, 123, 255)',
        light: 'rgb(102, 178, 255)',
        dark: 'rgb(0, 82, 204)',
    },
    error: {
        main: 'rgb(211, 47, 47)',
        light: 'rgb(239, 83, 80)',
        dark: 'rgb(183, 28, 28)',
    },
    warning: {
        main: 'rgb(255, 152, 0)',
        light: 'rgb(255, 183, 77)',
        dark: 'rgb(245, 124, 0)',
    },
    info: {
        main: 'rgb(3, 169, 244)',
        light: 'rgb(77, 208, 225)',
        dark: 'rgb(2, 136, 209)',
    },
    success: {
        main: 'rgb(76, 175, 80)',
        light: 'rgb(129, 199, 132)',
        dark: 'rgb(56, 142, 60)',
    },
};

export const lightTheme = createTheme({
    palette: lightPalette,
});

export const darkTheme = createTheme({
    palette: darkPalette,
});

