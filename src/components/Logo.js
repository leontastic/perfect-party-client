import React from 'react'
import { Avatar, Chip, Typography } from '@material-ui/core'
import { lightGreen, green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import CakeIcon from '@material-ui/icons/Cake'

const useStyles = makeStyles(theme => ({
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1em',
    backgroundColor: green[800],
  },
  avatar: {
    backgroundColor: lightGreen[500],
  },
}))

const Logo = () => {
  const classes = useStyles()
  return (
    <div className={classes.logo}>
      <Chip
        avatar={
          <Avatar className={classes.avatar}>
            <CakeIcon />
          </Avatar>
        }
        label={<Typography variant='overline'>Perfect Party</Typography>}
        size='medium'
        color='primary'
      />
    </div>
  )
}

export default Logo
