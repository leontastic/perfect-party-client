import { startCase } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { Box, Button, Divider, InputAdornment, Paper, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/SearchOutlined'
import MusicNoteIcon from '@material-ui/icons/MusicNoteOutlined'
import RestaurantIcon from '@material-ui/icons/RestaurantOutlined'
import LocalFloristIcon from '@material-ui/icons/LocalFloristOutlined'
import { getSearchProductType } from '../store/selectors'
import { setSearchProductType } from '../store/actions'
import { createStructuredSelector } from 'reselect'

const useStyles = makeStyles(theme => ({
  iconLeft: {
    marginRight: theme.spacing(1),
  },
  iconRight: {
    marginLeft: theme.spacing(1),
  },
}))

const productTypes = [
  ['FoodItem', 'Food', RestaurantIcon],
  ['DecorItem', 'Decor', LocalFloristIcon],
  ['Entertainment', 'Entertainment', MusicNoteIcon],
]

const ProductSearchBar = ({ productType, setProductType }) => {
  const classes = useStyles()
  return (
    <>
      <Paper>
        <Box p={2}>
          <Box display='flex' mx={-1} flexWrap='wrap'>
            {productTypes.map(([productTypeOption, label, Icon]) => (
              <Box flex={1} m={1} key={productTypeOption}>
                <Button
                  variant={productTypeOption === productType ? 'contained' : 'text'}
                  onClick={() => setProductType(productTypeOption)}
                  color='primary'
                  fullWidth
                >
                  <Icon className={classes.iconLeft} />
                  <Typography variant='button'>{label}</Typography>
                </Button>
              </Box>
            ))}
          </Box>
          <Box my={2}>
            <Divider className={classes.divider} />
          </Box>
          <Box display='flex' alignItems='center' justifyContent='center' mx={-1}>
            <Box flex={1} m={1}>
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
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
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