import { startCase } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, InputAdornment, List, ListItem, TextField, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/SearchOutlined'
import MusicNoteIcon from '@material-ui/icons/MusicNoteOutlined'
import RestaurantIcon from '@material-ui/icons/RestaurantOutlined'
import LocalFloristIcon from '@material-ui/icons/LocalFloristOutlined'
import { getSearchProductType } from '../store/selectors'
import { setSearchProductType } from '../store/actions'
import { createStructuredSelector } from 'reselect'
import { useListItemStyles } from '../utils/hooks/styles'

const useStyles = makeStyles(theme => ({
  iconLeft: {
    marginRight: theme.spacing(1),
  },
}))

const productTypes = [
  ['FoodItem', 'Food', RestaurantIcon],
  ['DecorItem', 'Decor', LocalFloristIcon],
  ['Entertainment', 'Entertainment', MusicNoteIcon],
]

const ProductSearchBar = ({ productType, setProductType }) => {
  const classes = useStyles()
  const listItemClasses = useListItemStyles()
  return (
    <List>
      <ListItem classes={listItemClasses} divider>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Box display='flex' mx={-1}>
              {productTypes.map(([productTypeOption, label, Icon]) => (
                <Box flex={1} mx={1} key={productTypeOption}>
                  <Button
                    variant={productTypeOption === productType ? 'contained' : 'text'}
                    onClick={() => setProductType(productTypeOption)}
                    color='primary'
                    fullWidth
                    size='large'
                  >
                    <Icon className={classes.iconLeft} />
                    <Typography variant='button'>{label}</Typography>
                  </Button>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item sm={12} mx={-1} flex={1}>
            <TextField
              fullWidth
              variant='outlined'
              type='search'
              placeholder={`Search ${startCase(productTypes.find(([type]) => type === productType)[1])} Products`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <SearchIcon color='action' />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </ListItem>
    </List>
  )
}

export default connect(
  createStructuredSelector({
    productType: getSearchProductType,
  }),
  {
    setProductType: setSearchProductType,
  },
)(ProductSearchBar)
