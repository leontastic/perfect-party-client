import { createMuiTheme } from '@material-ui/core'
import { green, orange } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: { main: green[700] },
    secondary: { main: orange[900] },
  },
})

export default theme
