import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditIcon from '@material-ui/icons/EditOutlined'
import FaceIcon from '@material-ui/icons/FaceOutlined'
import { pushState } from '../store/actions'
import { getHosts } from '../store/selectors'
import { useListItemStyles } from '../utils/hooks/styles'

const Hosts = ({ hosts, pushState }) => {
  const listItemClasses = useListItemStyles()
  return (
    <List>
      {hosts.map(({ hostid, firstname, lastname, phonenumber, email }) => (
        <ListItem key={hostid} classes={listItemClasses}>
          <ListItemAvatar>
            <Avatar bgcolor='textPrimary'>
              <FaceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${firstname} ${lastname}`}
            secondary={
              <>
                {phonenumber}
                <br />
                {email}
              </>
            }
          />
          <ListItemSecondaryAction>
            <IconButton color='primary' onClick={() => pushState(`/hosts/edit/${hostid}`)}>
              <EditIcon />
            </IconButton>
            <IconButton color='secondary' onClick={() => pushState(`/hosts/remove/${hostid}`)}>
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
    hosts: getHosts,
  }),
  {
    pushState,
  },
)(Hosts)
