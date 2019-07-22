import { toNumber } from 'lodash'
import { DateTime } from 'luxon'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Avatar,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditOutlined'
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined'
import EventIcon from '@material-ui/icons/EventOutlined'
import { getEvents } from '../store/selectors'
import { pushState } from '../store/actions'
import { useListItemStyles } from '../utils/hooks/styles'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCartOutlined'

const Events = ({ events, pushState }) => {
  const listItemClasses = useListItemStyles()
  return (
    <List>
      {events.map(({ eventid, eventname, eventdate, venuename, venueprice, venueaddress, hostname }) => (
        <ListItem key={eventid} classes={listItemClasses}>
          <ListItemText
            disableTypography
            primary={
              <>
                <Chip
                  avatar={
                    <Avatar size='small'>
                      <EventIcon />
                    </Avatar>
                  }
                  label={DateTime.fromISO(eventdate).toFormat('DDD')}
                  color='primary'
                />
                <Box my={2}>
                  <Typography variant='h6' color='textPrimary'>
                    {eventname}
                  </Typography>
                  <Typography variant='subtitle2' color='textSecondary'>
                    Hosted by {hostname}
                  </Typography>
                </Box>
              </>
            }
            secondary={
              <Box mt={2}>
                <Typography variant='body1' color='primary'>
                  @ {venuename} (${toNumber(venueprice)} / day)
                </Typography>
                <Typography variant='caption' color='textSecondary'>
                  {venueaddress}
                </Typography>
              </Box>
            }
          />
          <ListItemSecondaryAction>
            <IconButton onClick={() => pushState(`/events/shop/${eventid}`)}>
              <AddShoppingCartIcon />
            </IconButton>
            <IconButton color='primary' onClick={() => pushState(`/events/edit/${eventid}`)}>
              <EditIcon />
            </IconButton>
            <IconButton color='secondary' onClick={() => pushState(`/events/remove/${eventid}`)}>
              <DeleteIcon color='error' />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

export default connect(
  createStructuredSelector({
    events: getEvents,
  }),
  { pushState },
)(Events)
