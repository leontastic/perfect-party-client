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
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import EditIcon from '@material-ui/icons/EditOutlined'
import LocalShippingIcon from '@material-ui/icons/LocalShippingOutlined'
import { getSuppliers } from '../store/selectors'

const Suppliers = ({ suppliers }) => (
  <List>
    {suppliers.map(({ supplierid, name, email, address }) => (
      <ListItem key={supplierid}>
        <ListItemAvatar>
          <Avatar>
            <LocalShippingIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <>
              {address}
              <br />
              {email}
            </>
          }
        />
        <ListItemSecondaryAction>
          <IconButton color='primary'>
            <EditIcon color='primary' />
          </IconButton>
          <IconButton color='secondary'>
            <DeleteIcon color='error' />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
)

export default connect(
  createStructuredSelector({
    suppliers: getSuppliers,
  }),
)(Suppliers)
