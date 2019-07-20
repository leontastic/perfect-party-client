import { DateTime } from 'luxon'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Avatar, Button, Card, Chip, CardActions, CardContent, Typography } from '@material-ui/core'
import EventIcon from '@material-ui/icons/EventOutlined'
import { makeStyles } from '@material-ui/styles'
import { getEvents } from '../store/selectors'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  chip: {
    marginBottom: theme.spacing(2),
  },
}))

const Hosts = ({ events }) => {
  const classes = useStyles()
  return events.map(({ eventid, eventname, eventdate, venuename, venueprice, hostname }) => (
    <Card key={eventid} classes={{ root: classes.card }}>
      <CardContent>
        <Chip
          avatar={
            <Avatar>
              <EventIcon size='small' />
            </Avatar>
          }
          color='primary'
          label={DateTime.fromISO(eventdate).toFormat('DDD')}
          className={classes.chip}
        />
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
        <Button variant='outlined'>Update</Button>
        <Button variant='outlined'>Order Products</Button>
        <Button variant='outlined'>Remove</Button>
      </CardActions>
    </Card>
  ))
}

export default connect(
  createStructuredSelector({
    events: getEvents,
  }),
)(Hosts)
