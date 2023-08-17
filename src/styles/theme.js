import { createTheme } from '@mui/material'
import { green, red, black } from '@mui/material/colors'

export const PRIMARY_COLOR = '#1F72A6'
export const SECONDARY_COLOR = '#0FA6A6'
export const TERTIARY_COLOR = '#A0D3D9'
export const BLACK_COLOR =  '#363636'
export const BLACK_ALT_COLOR = '#363636'
export const WHITE_COLOR = 'white'

export const SUCCESS_COLOR = green[300]
export const ERROR_COLOR = red[300]


// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },

    common: {
        black: '#1E1E1E',
    },
    
    error: {
      main: red.A400,
    },
    warning: {
      main: red.A100,
    },
    background: {
      default: '#fff',
    },
  },

  shape: {
    borderRadius: 12
  },
  zIndex: 1,
})


export default theme