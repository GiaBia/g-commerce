import { createTheme } from '@mui/material/styles'

export const themeOptions = {
    palette: {
        type: 'light',
        primary: {
            main: '#fedbd0',
            contrastText: '#442c2e',
        },
        secondary: {
            main: '#feeae6',
        },
    },
}

export const theme = createTheme(themeOptions)
