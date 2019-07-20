import { toNumber } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core'
import { getVenues } from '../store/selectors'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: '1em',
    marginBottom: '1em',
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}))

const Venues = ({ venues }) => {
  const classes = useStyles()

  return venues.map(({ venueid, name, address, price, eventcount }) => (
    <Card classes={{ root: classes.card }} key={venueid}>
      <CardContent>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant='h6'>
                {name}
              </Typography>
              <Typography variant='body2' gutterBottom>
                {address}
              </Typography>
              <Typography variant='body2' color='primary'>
                {eventcount} events booked at this venue
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>${toNumber(price)}/day</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant='outlined'>Update</Button>
        <Button variant='outlined'>Remove</Button>
      </CardActions>
    </Card>
  ))
}

export default connect(
  createStructuredSelector({
    venues: getVenues,
  }),
)(Venues)
