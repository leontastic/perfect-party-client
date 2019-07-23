import { toPairs } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  DialogActions,
} from '@material-ui/core'
import {
  createRouteStartsWithSelector,
  getCurrentEvent,
  getCurrentEventCartQuantities,
  getCurrentEventCartProducts,
  getCurrentEventCartProductCount,
  getCurrentEventCartValue,
} from '../store/selectors'
import {
  pushState,
  pushStateActionCreator,
  addProductToCart,
  removeProductFromCart,
  clearCart,
  submitFormActionCreator,
} from '../store/actions'
import { useListItemStyles, useWideListItemAvatarStyles } from '../utils/hooks/styles'
import compactPrice from '../utils/compactPrice'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined'
import CheckIcon from '@material-ui/icons/CheckOutlined'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCartOutlined'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCartOutlined'
import SunnyIcon from '@material-ui/icons/WbSunnyOutlined'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  title: {
    backgroundColor: theme.palette.grey[100],
  },
  iconLeft: {
    marginRight: theme.spacing(1),
  },
}))

const CartDialog = ({
  open,
  event: { eventid } = {},
  onClose,
  products = [],
  quantities = {},
  count,
  subtotal,
  pushState,
  addProductToCart,
  removeProductFromCart,
  onSubmit,
  clearCart,
}) => {
  const listItemAvatarClasses = useWideListItemAvatarStyles()
  const listItemClasses = useListItemStyles()
  const classes = useStyles()
  return (
    <Dialog maxWidth='sm' fullWidth open={open} onClose={() => onClose()}>
      <DialogTitle classes={{ root: classes.title }}>
        <Box my={1} display='flex' justifyContent='space-between' alignItems='flex-start'>
          <Box>
            <Typography variant='h4'>
              Check Out{' '}
              <Typography variant='h6' component='span'>
                ({count} items)
              </Typography>
            </Typography>
          </Box>
          <Button variant='outlined' color='default' onClick={() => pushState(`/events/shop/${eventid}`)}>
            <ShoppingCartIcon className={classes.iconLeft} />
            Continue shopping
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        {products.length ? (
          <>
            <List>
              {products.map(({ productid, name, description, price, suppliername }) => (
                <ListItem key={productid} classes={listItemClasses} disableGutters>
                  <ListItemAvatar classes={listItemAvatarClasses}>
                    <Box textAlign='center'>
                      <Box m={1}>
                        <Typography variant='h6'>{compactPrice(price)}</Typography>
                        <Typography variant='subtitle1'>x {quantities[productid]}</Typography>
                      </Box>
                    </Box>
                  </ListItemAvatar>
                  <ListItemText
                    primary={name}
                    secondary={
                      <>
                        {description}
                        <br />
                        <Typography color='primary' variant='caption'>
                          {suppliername}
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton color='primary' onClick={() => addProductToCart(productid, eventid)}>
                      <AddShoppingCartIcon />
                    </IconButton>
                    <IconButton color='secondary' onClick={() => removeProductFromCart(productid, eventid)}>
                      <RemoveShoppingCartIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' py={4}>
            <SunnyIcon />
          </Box>
        )}
      </DialogContent>
      <DialogActions classes={{ root: classes.title }}>
        <Box display='flex' p={2} flex={1} justifyContent='space-between'>
          <Button variant='outlined' color='secondary' onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              clearCart(eventid)
              onSubmit(
                toPairs(quantities).map(([productid, quantity]) => ({
                  eventid,
                  productid,
                  quantity,
                })),
              )
            }}
          >
            <CheckIcon className={classes.iconLeft} />
            Submit Order (${subtotal})
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  createStructuredSelector({
    open: createRouteStartsWithSelector('/events/cart'),
    products: getCurrentEventCartProducts,
    quantities: getCurrentEventCartQuantities,
    event: getCurrentEvent,
    count: getCurrentEventCartProductCount,
    subtotal: getCurrentEventCartValue,
  }),
  {
    addProductToCart,
    removeProductFromCart,
    pushState,
    onClose: pushStateActionCreator('events'),
    onSubmit: submitFormActionCreator('orders', 'orderid', 'POST', 'events'),
    clearCart,
  },
)(CartDialog)
