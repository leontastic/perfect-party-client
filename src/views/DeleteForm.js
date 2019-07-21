import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
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
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import Form from '../components/Form'
import { makeStyles } from '@material-ui/styles'
import { getContextHost, createGetRouteStartsWith } from '../store/selectors'
import { createGoTo, submitDeleteHostForm } from '../store/actions'

const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}))

const DeleteDialog = ({ open, label, entity, message, onCancel, onSubmit }) => {
  const classes = useStyles()
  return (
    <Dialog open={open} onClose={() => onCancel()} maxWidth='xs' scroll='body'>
      <Form onSubmit={() => onSubmit(entity)}>
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
            <Button variant='outlined' onClick={() => onCancel()} color='secondary'>
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
    open: createGetRouteStartsWith('/hosts/remove'),
    entity: getContextHost,
    label: () => 'Remove Host',
    message: createSelector(
      getContextHost,
      host => host && `Are you sure you want to remove ${host.firstname} ${host.lastname}?`,
    ),
  }),
  {
    onCancel: createGoTo('/hosts'),
    onSubmit: submitDeleteHostForm,
  },
)(DeleteDialog)
