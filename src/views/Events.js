import { toNumber, toPairs } from 'lodash'
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
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditOutlined'
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined'
import EventIcon from '@material-ui/icons/EventOutlined'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import { getEvents, getOrders } from '../store/selectors'
import { pushState } from '../store/actions'
import { useListItemStyles } from '../utils/hooks/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined'

const Events = ({ events, pushState, orders }) => {
  const listItemClasses = useListItemStyles()
  return (
    <List>
      {events.map(
        ({ eventid, eventname, eventdate, venuename, venueprice, venueaddress, hostname, ordertotal, total }) => (
          <React.Fragment key={eventid}>
            <ListItem classes={listItemClasses}>
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
                  <ShoppingCartIcon />
                </IconButton>
                <IconButton color='primary' onClick={() => pushState(`/events/edit/${eventid}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton color='secondary' onClick={() => pushState(`/events/remove/${eventid}`)}>
                  <DeleteIcon color='error' />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {total ? (
              <ExpansionPanel elevation={0}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color='secondary'>
                    Total Cost: ${venueprice} + ${ordertotal} = ${total}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Box>
                    {orders[eventid]
                      ? toPairs(orders[eventid]).map(([ordertime, orders]) => (
                          <Box p={2} key={ordertime}>
                            <Chip
                              avatar={
                                <Avatar size='small'>
                                  <EventIcon />
                                </Avatar>
                              }
                              label={<>Ordered on {DateTime.fromISO(ordertime).toFormat('ff')}</>}
                              color='secondary'
                            />
                            {orders.map(({ productid, name, quantity, price, total, description }) => (
                              <Box p={2} key={productid}>
                                <Typography variant='subtitle1'>
                                  {name} x {quantity} x {price} = {total}
                                </Typography>
                                <Typography variant='caption'>{description}</Typography>
                              </Box>
                            ))}
                          </Box>
                        ))
                      : null}
                  </Box>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ) : null}
          </React.Fragment>
        ),
      )}
    </List>
  )
}

export default connect(
  createStructuredSelector({
    events: getEvents,
    orders: getOrders,
  }),
  { pushState },
)(Events)
