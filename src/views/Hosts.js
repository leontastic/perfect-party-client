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
import { goTo } from '../store/actions'
import { getHosts } from '../store/selectors'

const Hosts = ({ hosts, goTo }) => {
  return (
    <List>
      {hosts.map(({ hostid, firstname, lastname, phonenumber, email }) => (
        <ListItem key={hostid}>
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
            <IconButton color='primary' onClick={() => goTo(`/hosts/edit/${hostid}`)}>
              <EditIcon />
            </IconButton>
            <IconButton color='secondary' onClick={() => goTo(`/hosts/remove/${hostid}`)}>
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
    goTo,
  },
)(Hosts)
