import { createMuiTheme } from '@material-ui/core/styles'

// Colors

const theme = createMuiTheme({
  palette: {
    // primary: red,
    // secondary: grey,
    // error: orange,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      paper: 'white',
    },
  },
  typography: {
    useNextVariants: true,
    fontSize: 15,
  },
})

export default theme