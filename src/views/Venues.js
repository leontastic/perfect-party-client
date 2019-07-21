import { toNumber } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { getVenues } from '../store/selectors'
import { goTo } from '../store/actions'
import EditIcon from '@material-ui/icons/EditOutlined'
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined'
import { useListItemStyles, useWideListItemAvatarStyles } from '../utils/hooks/styles'

const Venues = ({ venues, goTo }) => {
  const listItemAvatarClasses = useWideListItemAvatarStyles()
  const listItemClasses = useListItemStyles()
  return (
    <List>
      {venues.map(({ venueid, name, address, price, eventcount }) => (
        <ListItem key={venueid} classes={listItemClasses}>
          <ListItemAvatar classes={listItemAvatarClasses}>
            <Box display='flex' flexDirection='column' alignItems='center' mr={2}>
              <Typography variant='h6'>${toNumber(price)}</Typography>
              <Typography variant='overline'>per day</Typography>
            </Box>
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography variant='h6'>{name}</Typography>
                <Typography variant='subtitle2' color='textSecondary'>
                  {address}
                </Typography>
              </>
            }
            secondary={
              <Typography variant='caption' color='primary'>
                {eventcount} events booked at this venue
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <IconButton color='primary' onClick={() => goTo(`/venues/edit/${venueid}`)}>
              <EditIcon />
            </IconButton>
            <IconButton color='secondary' onClick={() => goTo(`/venues/remove/${venueid}`)}>
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
    venues: getVenues,
  }),
  { goTo },
)(Venues)
