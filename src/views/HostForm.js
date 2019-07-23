import React from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
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
import { pushStateActionCreator, submitFormActionCreator, createSetFormField } from '../store/actions'
import { createRouteStartsWithSelector, createFormFieldsSelector, getCurrentHost } from '../store/selectors'
import Form from '../components/Form'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}))

const HostFormDialog = ({ editing, open, fields, onClose, onSubmit, onChange }) => {
  const classes = useStyles()
  const handleFieldChanged = ({ target: { value, name } }) => onChange(value, name)
  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth='xs' fullWidth scroll='body'>
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
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box display='flex' p={2} flex={1} justifyContent='space-between'>
            <Button variant='outlined' onClick={() => onClose()} color='secondary'>
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
    open: createRouteStartsWithSelector('/hosts/new'),
    fields: createFormFieldsSelector('addHost'),
    editing: () => false,
  }),
  {
    onChange: createSetFormField('addHost'),
    onSubmit: submitFormActionCreator('hosts', 'hostid', 'POST'),
    onClose: pushStateActionCreator('hosts'),
  },
)(HostFormDialog)

export const EditHostForm = connect(
  createStructuredSelector({
    open: createRouteStartsWithSelector('/hosts/edit'),
    fields: createSelector(
      createFormFieldsSelector('editHost'),
      getCurrentHost,
      (fields, { eventcount, ...host } = {}) => ({ ...host, ...fields }),
    ),
    editing: () => true,
  }),
  {
    onChange: createSetFormField('editHost'),
    onSubmit: submitFormActionCreator('hosts', 'hostid', 'PUT'),
    onClose: pushStateActionCreator('hosts'),
  },
)(HostFormDialog)
