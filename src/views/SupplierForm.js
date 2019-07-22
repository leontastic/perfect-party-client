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
import { createRouteStartsWithSelector, createFormFieldsSelector, getCurrentSupplier } from '../store/selectors'
import Form from '../components/Form'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}))

const SupplierFormDialog = ({ editing, open, fields, onCancel, onSubmit, onChange }) => {
  const classes = useStyles()
  const handleFieldChanged = ({ target: { value, name } }) => onChange(value, name)
  return (
    <Dialog open={open} onClose={() => onCancel()} maxWidth='xs' fullWidth scroll='body'>
      <Form onSubmit={() => onSubmit(fields)}>
        <DialogTitle>
          <Box my={1}>
            <Typography variant='h4'>{editing ? 'Update Supplier' : 'Add Supplier'}</Typography>
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
                label='Address'
                name='address'
                value={fields['address'] || ''}
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
              {editing ? 'Update Supplier' : 'Add Supplier'}
            </Button>
          </Box>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export const AddSupplierForm = connect(
  createStructuredSelector({
    open: createRouteStartsWithSelector('/suppliers/new'),
    fields: createFormFieldsSelector('addSupplier'),
    editing: () => false,
  }),
  {
    onChange: createSetFormField('addSupplier'),
    onSubmit: submitFormActionCreator('suppliers', 'supplierid', 'POST'),
    onCancel: pushStateActionCreator('suppliers'),
  },
)(SupplierFormDialog)

export const EditSupplierForm = connect(
  createStructuredSelector({
    open: createRouteStartsWithSelector('/suppliers/edit'),
    fields: createSelector(
      createFormFieldsSelector('editSupplier'),
      getCurrentSupplier,
      (fields, supplier) => ({ ...supplier, ...fields }),
    ),
    editing: () => true,
  }),
  {
    onChange: createSetFormField('editSupplier'),
    onSubmit: submitFormActionCreator('suppliers', 'supplierid', 'PUT'),
    onCancel: pushStateActionCreator('suppliers'),
  },
)(SupplierFormDialog)
