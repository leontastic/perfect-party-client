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
import { createRouteStartsWithSelector, createFormFieldsSelector, getCurrentVenue } from '../store/selectors'
import Form from '../components/Form'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}))

const VenueFormDialog = ({ editing, open, fields, onClose, onSubmit, onChange }) => {
  const classes = useStyles()
  const handleFieldChanged = ({ target: { value, name } }) => onChange(value, name)
  return (
    <Dialog open={open} onClose={() => onClose()} maxWidth='xs' fullWidth scroll='body'>
      <Form onSubmit={() => onSubmit(fields)}>
        <DialogTitle>
          <Box my={1}>
            <Typography variant='h4'>{editing ? 'Update Venue' : 'Add Venue'}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleFieldChanged}
                required
                variant='outlined'
                label='Name'
                name='name'
                value={fields['name'] || ''}
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleFieldChanged}
                required
                variant='outlined'
                label='Address'
                name='address'
                value={fields['address'] || ''}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleFieldChanged}
                required
                variant='outlined'
                label='Price'
                name='price'
                value={fields['price'] || ''}
                type='number'
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
              {editing ? 'Update Venue' : 'Add Venue'}
            </Button>
          </Box>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export const AddVenueForm = connect(
  createStructuredSelector({
    open: createRouteStartsWithSelector('/venues/new'),
    fields: createFormFieldsSelector('addVenue'),
    editing: () => false,
  }),
  {
    onChange: createSetFormField('addVenue'),
    onSubmit: submitFormActionCreator('venues', 'venueid', 'POST'),
    onClose: pushStateActionCreator('venues'),
  },
)(VenueFormDialog)

export const EditVenueForm = connect(
  createStructuredSelector({
    open: createRouteStartsWithSelector('/venues/edit'),
    fields: createSelector(
      createFormFieldsSelector('editVenue'),
      getCurrentVenue,
      (fields, { eventcount, ...venue } = {}) => ({ ...venue, ...fields }),
    ),
    editing: () => true,
  }),
  {
    onChange: createSetFormField('editVenue'),
    onSubmit: submitFormActionCreator('venues', 'venueid', 'PUT'),
    onClose: pushStateActionCreator('venues'),
  },
)(VenueFormDialog)
