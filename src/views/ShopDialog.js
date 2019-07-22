import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Badge,
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
} from '@material-ui/core'
import {
  createRouteStartsWithSelector,
  getSearchProductResults,
  getCurrentEvent,
  getCurrentEventCartQuantities,
} from '../store/selectors'
import { pushState, pushStateActionCreator, addProductToCart, removeProductFromCart } from '../store/actions'
import { useListItemStyles, useWideListItemAvatarStyles } from '../utils/hooks/styles'
import compactPrice from '../utils/compactPrice'
import ProductSearchBar from '../components/ProductSearchBar'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCartOutlined'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCartOutlined'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  title: {
    backgroundColor: theme.palette.grey[100],
  },
  iconLeft: {
    marginRight: theme.spacing(1),
  },
}))

const ShopDialog = ({
  open,
  event: { eventid } = {},
  onCancel,
  products,
  cart,
  pushState,
  addProductToCart,
  removeProductFromCart,
}) => {
  const listItemAvatarClasses = useWideListItemAvatarStyles()
  const listItemClasses = useListItemStyles()
  const classes = useStyles()
  const totalCartItems = cart && Object.values(cart).reduce((sum, count) => sum + count, 0)
  return (
    <Dialog maxWidth='sm' fullWidth open={open} onClose={() => onCancel()}>
      <DialogTitle classes={{ root: classes.title }}>
        <Box my={1} display='flex' justifyContent='space-between' alignItems='flex-start'>
          <Typography variant='h4'>Order Products</Typography>
          <Badge badgeContent={totalCartItems && `+${totalCartItems}`} color='primary'>
            <Button variant='outlined' color='default' onClick={() => pushState(`/events/cart/${eventid}`)}>
              <ShoppingCartIcon className={classes.iconLeft} />
              Check Out
            </Button>
          </Badge>
        </Box>
        <ProductSearchBar />
      </DialogTitle>
      <DialogContent>
        <List>
          {products.map(({ productid, name, description, price, suppliername }) => (
            <ListItem key={productid} classes={listItemClasses} disableGutters>
              <ListItemAvatar classes={listItemAvatarClasses}>
                <Box textAlign='center'>
                  <Badge badgeContent={cart && cart[productid] && `+${cart[productid]}`} color='primary'>
                    <Box m={1}>
                      <Typography variant='h6'>{compactPrice(price)}</Typography>
                    </Box>
                  </Badge>
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
                <div>
                  <IconButton color='primary' onClick={() => addProductToCart(productid, eventid)}>
                    <AddShoppingCartIcon />
                  </IconButton>
                  <IconButton color='secondary' onClick={() => removeProductFromCart(productid, eventid)}>
                    <RemoveShoppingCartIcon />
                  </IconButton>
                </div>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default connect(
  createStructuredSelector({
    open: createRouteStartsWithSelector('/events/shop'),
    products: getSearchProductResults,
    event: getCurrentEvent,
    cart: getCurrentEventCartQuantities,
  }),
  {
    addProductToCart,
    removeProductFromCart,
    pushState,
    onCancel: pushStateActionCreator('events'),
  },
)(ShopDialog)
