import { flow, toNumber } from 'lodash/fp'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditOutlined'
import DeleteIcon from '@material-ui/icons/DeleteForeverOutlined'
import ProductSearchBar from '../components/ProductSearchBar'
import { getSearchProductResults, getSearchProductType } from '../store/selectors'
import { pushState } from '../store/actions'
import { useListItemStyles, useWideListItemAvatarStyles } from '../utils/hooks/styles'

const compactPrice = flow(
  toNumber,
  number => [number, Math.floor(Math.log10(number))],
  ([number, base]) => (base >= 3 ? `~$${Math.round(number / Math.pow(10, base - 1)) / 10}K` : `$${number}`),
)

const Products = ({ products, pushState }) => {
  const listItemAvatarClasses = useWideListItemAvatarStyles()
  const listItemClasses = useListItemStyles()
  return (
    <>
      <ProductSearchBar />
      <List>
        {products.map(({ productid, name, description, price, suppliername }) => (
          <ListItem key={productid} classes={listItemClasses} disableGutters>
            <ListItemAvatar classes={listItemAvatarClasses}>
              <Box textAlign='center'>
                <Typography variant='h6'>{compactPrice(price)}</Typography>
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
              <IconButton color='primary' onClick={() => pushState(`/products/edit/${productid}`)}>
                <EditIcon />
              </IconButton>
              <IconButton color='secondary' onClick={() => pushState(`/products/remove/${productid}`)}>
                <DeleteIcon color='error' />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default connect(
  createStructuredSelector({
    productType: getSearchProductType,
    products: getSearchProductResults,
  }),
  { pushState },
)(Products)
