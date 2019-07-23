import React from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined'
import Form from '../components/Form'
import { makeStyles } from '@material-ui/styles'
import {
  createRouteStartsWithSelector,
  getCurrentEvent,
  getCurrentHost,
  getCurrentProduct,
  getCurrentSupplier,
  getCurrentVenue,
} from '../store/selectors'
import { pushStateActionCreator, submitFormActionCreator } from '../store/actions'

const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}))

const DeleteDialog = ({ open, label, fields, message, onClose, onSubmit }) => {
  const classes = useStyles()
  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth='xs' fullWidth scroll='body'>
      <Form onSubmit={() => onSubmit(fields)}>
        <DialogTitle>
          <Box my={1}>
            <Typography variant='h4'>{label}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box display='flex' p={2} flex={1} justifyContent='space-between'>
            <Button variant='outlined' onClick={() => onClose()} color='secondary'>
              Cancel
            </Button>
            <Button variant='contained' type='submit' color='secondary'>
              <DeleteIcon className={classes.leftIcon} />
              {label}
            </Button>
          </Box>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export const DeleteHost = connect(
  createStructuredSelector({
    open: createRouteStartsWithSelector('/hosts/remove'),
    fields: getCurrentHost,
    label: () => 'Remove Host',
    message: createSelector(
      getCurrentHost,
      host => host && `Are you sure you want to remove ${host.firstname} ${host.lastname}?`,
    ),
  }),
  {
    onClose: pushStateActionCreator('hosts'),
    onSubmit: submitFormActionCreator('hosts', 'hostid', 'DELETE'),
  },
)(DeleteDialog)

export const DeleteSupplier = connect(
  createStructuredSelector({
    open: createRouteStartsWithSelector('/suppliers/remove'),
    fields: getCurrentSupplier,
    label: () => 'Remove Supplier',
    message: createSelector(
      getCurrentSupplier,
      supplier => supplier && `Are you sure you want to remove ${supplier.name}?`,
    ),
  }),
  {
    onClose: pushStateActionCreator('suppliers'),
    onSubmit: submitFormActionCreator('suppliers', 'supplierid', 'DELETE'),
  },
)(DeleteDialog)

export const DeleteProduct = connect(
  createStructuredSelector({
    open: createRouteStartsWithSelector('/products/remove'),
    fields: getCurrentProduct,
    label: () => 'Remove Product',
    message: createSelector(
      getCurrentProduct,
      product => product && `Are you sure you want to remove ${product.name}?`,
    ),
  }),
  {
    onClose: pushStateActionCreator('products'),
    onSubmit: submitFormActionCreator('products', 'productid', 'DELETE'),
  },
)(DeleteDialog)

export const DeleteEvent = connect(
  createStructuredSelector({
    open: createRouteStartsWithSelector('/events/remove'),
    fields: getCurrentEvent,
    label: () => 'Remove Event',
    message: createSelector(
      getCurrentEvent,
      event => event && `Are you sure you want to remove ${event.eventname}?`,
    ),
  }),
  {
    onClose: pushStateActionCreator('events'),
    onSubmit: submitFormActionCreator('events', 'eventid', 'DELETE'),
  },
)(DeleteDialog)

export const DeleteVenue = connect(
  createStructuredSelector({
    open: createRouteStartsWithSelector('/venues/remove'),
    fields: getCurrentVenue,
    label: () => 'Remove Venue',
    message: createSelector(
      getCurrentVenue,
      venue => venue && `Are you sure you want to remove ${venue.name}?`,
    ),
  }),
  {
    onClose: pushStateActionCreator('venues'),
    onSubmit: submitFormActionCreator('venues', 'venueid', 'DELETE'),
  },
)(DeleteDialog)
