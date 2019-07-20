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

export default connect(
  createStructuredSelector({
    suppliers: getSuppliers,
  }),
)(Suppliers)
