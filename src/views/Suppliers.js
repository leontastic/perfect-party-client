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
import LocalShippingIcon from '@material-ui/icons/LocalShippingOutlined'
import { getSuppliers } from '../store/selectors'
import { goTo } from '../store/actions'
import { useListItemStyles } from '../utils/hooks/styles'

const Suppliers = ({ suppliers, goTo }) => {
  const listItemClasses = useListItemStyles()
  return (
    <List>
      {suppliers.map(({ supplierid, name, email, address }) => (
        <ListItem key={supplierid} classes={listItemClasses}>
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
            <IconButton color='primary' onClick={() => goTo(`/suppliers/edit/${supplierid}`)}>
              <EditIcon color='primary' />
            </IconButton>
            <IconButton color='secondary' onClick={() => goTo(`/suppliers/remove/${supplierid}`)}>
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
    suppliers: getSuppliers,
  }),
  {
    goTo,
  },
)(Suppliers)
