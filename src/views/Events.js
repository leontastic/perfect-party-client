import { DateTime } from 'luxon'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { getEvents } from '../store/selectors'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: '1em',
    marginBottom: '1em',
  },
}))

const Hosts = ({ events }) => {
  const classes = useStyles()
  return events.map(({ eventid, eventname, eventdate, venuename, venueprice, hostname }) => (
    <Card key={eventid} classes={{ root: classes.card }}>
      <CardContent>
        <Typography color='textSecondary' gutterBottom>
          {DateTime.fromISO(eventdate).toFormat('DDD')}
        </Typography>
        <Typography variant='h5'>{eventname}</Typography>
        <Typography color='primary' variant='subtitle1'>
          {' @ '}
          {venuename} (${venueprice}/day)
        </Typography>
        <Typography color='textSecondary' variant='subtitle2'>
          Hosted by {hostname}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color='primary'>Change Venue</Button>
        <Button color='primary'>Update Orders</Button>
      </CardActions>
    </Card>
  ))
}

export default connect(
  createStructuredSelector({
    events: getEvents,
  }),
)(Hosts)
