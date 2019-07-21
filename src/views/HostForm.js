import { merge } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddOutlined'
import CheckIcon from '@material-ui/icons/CheckOutlined'
import { createGoTo, setAddHostField, setEditHostField, submitAddHostForm, submitEditHostForm } from '../store/actions'
import { createGetRouteStartsWith, createGetFormFields, getContextHost } from '../store/selectors'
import Form from '../components/Form'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}))

const HostFormDialog = ({ editing, open, fields, onCancel, onSubmit, onChange }) => {
  const classes = useStyles()
  const handleFieldChanged = ({ target: { value, name } }) => onChange(value, name)
  return (
    <Dialog open={open} onClose={() => onCancel()} maxWidth='xs' scroll='body'>
      <Form onSubmit={() => onSubmit(fields)}>
        <DialogTitle>
          <Box my={1}>
            <Typography variant='h4'>{editing ? 'Update Host' : 'Add Host'}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                onChange={handleFieldChanged}
                required
                variant='outlined'
                label='First Name'
                name='firstname'
                value={fields['firstname'] || ''}
                type='text'
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={handleFieldChanged}
                required
                variant='outlined'
                label='Last Name'
                name='lastname'
                value={fields['lastname'] || ''}
                type='text'
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleFieldChanged}
                required
                variant='outlined'
                label='Email'
                name='email'
                value={fields['email'] || ''}
                type='email'
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleFieldChanged}
                required
                variant='outlined'
                label='Phone Number'
                name='phonenumber'
                value={fields['phonenumber'] || ''}
                type='text'
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box display='flex' p={2} flex={1} justifyContent='space-between'>
            <Button variant='outlined' onClick={() => onCancel()} color='secondary'>
              Cancel
            </Button>
            <Button variant='contained' type='submit' color='primary'>
              {editing ? <CheckIcon className={classes.leftIcon} /> : <AddIcon className={classes.leftIcon} />}
              {editing ? 'Update Host' : 'Add Host'}
            </Button>
          </Box>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export const AddHostForm = connect(
  createStructuredSelector({
    open: createGetRouteStartsWith('/hosts/new'),
    fields: createGetFormFields('addHost'),
    editing: () => false,
  }),
  {
    onChange: setAddHostField,
    onSubmit: submitAddHostForm,
    onCancel: createGoTo('/hosts'),
  },
)(HostFormDialog)

export const EditHostForm = connect(
  createStructuredSelector({
    open: createGetRouteStartsWith('/hosts/edit'),
    fields: createSelector(
      getContextHost,
      createGetFormFields('editHost'),
      merge,
    ),
    editing: () => true,
  }),
  {
    onChange: setEditHostField,
    onSubmit: submitEditHostForm,
    onCancel: createGoTo('/hosts'),
  },
)(HostFormDialog)
