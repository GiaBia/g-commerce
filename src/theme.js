import { createTheme } from '@mui/material/styles'

export const themeOptions = {
    palette: {
        type: 'light',
        primary: {
            main: '#512d38',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#b27092',
            contrastText: '#f4bfdb',
        },
        background: {
            default: '#fefefe',
        },
        success: {
            main: '#87baab',
        },
    },
}

export const theme = createTheme(themeOptions)
