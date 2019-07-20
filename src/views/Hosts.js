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
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined'
import EditIcon from '@material-ui/icons/EditOutlined'
import FaceIcon from '@material-ui/icons/FaceOutlined'
import { getHosts } from '../store/selectors'

const Hosts = ({ hosts }) => {
  return (
    <List>
      {hosts.map(({ hostid, firstname, lastname, phonenumber, email }) => (
        <ListItem key={hostid}>
          <ListItemAvatar>
            <Avatar>
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
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteForeverIcon />
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
)(Hosts)
