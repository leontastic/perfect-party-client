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
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddOutlined'
import CheckIcon from '@material-ui/icons/CheckOutlined'
import { goToActionCreator, submitFormActionCreator, createSetFormField } from '../store/actions'
import { createGetRouteStartsWith, createFormFieldsSelector, getSuppliers, getCurrentProduct } from '../store/selectors'
import Form from '../components/Form'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}))

const ProductFormDialog = ({ editing, open, fields, suppliers, onCancel, onSubmit, onChange }) => {
  const classes = useStyles()
  const handleFieldChanged = ({ target: { value, name } }) => onChange(value, name)
  return (
    <Dialog open={open} onClose={() => onCancel()} maxWidth='xs' fullWidth scroll='body'>
      <Form onSubmit={() => onSubmit(fields)}>
        <DialogTitle>
          <Box my={1}>
            <Typography variant='h4'>{editing ? 'Update Product' : 'Add Product'}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {editing ? null : (
                <TextField
                  onChange={handleFieldChanged}
                  required
                  select
                  variant='outlined'
                  label='Product Type'
                  name='producttype'
                  value={fields['producttype'] || ''}
                  fullWidth
                  autoFocus
                >
                  <MenuItem value='FoodItem'>Food</MenuItem>
                  <MenuItem value='DecorItem'>Decor</MenuItem>
                  <MenuItem value='Entertainment'>Entertainment</MenuItem>
                </TextField>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleFieldChanged}
                required
                variant='outlined'
                label='Name'
                name='name'
                value={fields['name'] || ''}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleFieldChanged}
                multiline
                variant='outlined'
                label='Description'
                name='description'
                value={fields['description'] || ''}
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
                type='number'
                value={fields['price'] || ''}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleFieldChanged}
                required
                variant='outlined'
                label='Supplier'
                select
                name='supplierid'
                type='number'
                value={fields['supplierid'] || ''}
                fullWidth
              >
                {suppliers.map(({ supplierid, name, address }) => (
                  <MenuItem key={supplierid} value={supplierid}>
                    <Box p={1}>
                      {name}
                      <Typography variant='caption' color='textSecondary' component='div'>
                        {address}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        {fields['producttype'] ? (
          <>
            <DialogTitle>
              <Box my={1}>
                <Typography variant='h6'>
                  {fields['producttype'] === 'FoodItem' && 'Food Attributes'}
                  {fields['producttype'] === 'DecorItem' && 'Decor Attributes'}
                  {fields['producttype'] === 'Entertainment' && 'Entertainment Attributes'}
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              {fields['producttype'] === 'FoodItem' && (
                <Grid item xs={12}>
                  <TextField
                    onChange={handleFieldChanged}
                    variant='outlined'
                    label='Cuisine'
                    name='cuisine'
                    value={fields['cuisine'] || ''}
                    required
                    fullWidth
                  />
                </Grid>
              )}
              {fields['producttype'] === 'DecorItem' && (
                <Grid item xs={12}>
                  <TextField
                    onChange={handleFieldChanged}
                    variant='outlined'
                    label='Color'
                    name='color'
                    value={fields['color'] || ''}
                    required
                    fullWidth
                  />
                </Grid>
              )}
              {fields['producttype'] === 'Entertainment' && (
                <Grid item xs={12}>
                  <TextField
                    onChange={handleFieldChanged}
                    variant='outlined'
                    label='Age Restriction'
                    name='agerestriction'
                    value={fields['agerestriction'] || ''}
                    type='number'
                    required
                    fullWidth
                  />
                </Grid>
              )}
            </DialogContent>
          </>
        ) : null}
        <DialogActions>
          <Box display='flex' p={2} flex={1} justifyContent='space-between'>
            <Button variant='outlined' onClick={() => onCancel()} color='secondary'>
              Cancel
            </Button>
            <Button variant='contained' type='submit' color='primary'>
              {editing ? <CheckIcon className={classes.leftIcon} /> : <AddIcon className={classes.leftIcon} />}
              {editing ? 'Update Product' : 'Add Product'}
            </Button>
          </Box>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export const AddProductForm = connect(
  createStructuredSelector({
    suppliers: getSuppliers,
    open: createGetRouteStartsWith('/products/new'),
    fields: createFormFieldsSelector('addProduct'),
    editing: () => false,
  }),
  {
    onChange: createSetFormField('addProduct'),
    onSubmit: submitFormActionCreator('products', 'productid', 'POST'),
    onCancel: goToActionCreator('products'),
  },
)(ProductFormDialog)

export const EditProductForm = connect(
  createStructuredSelector({
    suppliers: getSuppliers,
    open: createGetRouteStartsWith('/products/edit'),
    fields: createSelector(
      createFormFieldsSelector('editProduct'),
      getCurrentProduct,
      (fields, product) => ({ ...product, ...fields }),
    ),
    editing: () => true,
  }),
  {
    onChange: createSetFormField('editProduct'),
    onSubmit: submitFormActionCreator('products', 'productid', 'PUT'),
    onCancel: goToActionCreator('products'),
  },
)(ProductFormDialog)
