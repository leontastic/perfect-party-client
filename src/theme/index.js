import { createMuiTheme } from '@material-ui/core'
import { green, lightGreen } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: { main: green[700] },
    secondary: { main: lightGreen[400] },
  },
})

export default theme
