import React from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Container, Tab, Tabs, Typography } from '@material-ui/core'
import EventIcon from '@material-ui/icons/EventOutlined'
import FaceIcon from '@material-ui/icons/FaceOutlined'
import LocalFloristIcon from '@material-ui/icons/LocalFloristOutlined'
import LocalShippingIcon from '@material-ui/icons/LocalShippingOutlined'
import LocationCityIcon from '@material-ui/icons/LocationCityOutlined'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined'
import { grey } from '@material-ui/core/colors'

import Logo from './components/Logo'
import { getViewportWidth } from './store/selectors'
import './App.css'
import Hosts from './views/Hosts'
import Events from './views/Events'
import Venues from './views/Venues'

const TabContainer = ({ children }) => (
  <Container maxWidth='sm'>
    <Typography component='div' style={{ paddingTop: 24, paddingBottom: 24 }}>
      {children}
    </Typography>
  </Container>
)

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: grey[50],
  },
  appbar: {
    textAlign: 'center',
  },
  title: {
    whiteSpace: 'nowrap',
    textTransform: 'lowercase',
  },
  tabs: {
    flex: 1,
    '& > *': {
      height: '100%',
    },
  },
}))

const App = ({ viewportWidth }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
    <div className={classes.root}>
      <AppBar position='static' classes={{ root: classes.appbar }}>
        <Logo />
        <Tabs
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          variant={viewportWidth > 600 ? 'standard' : 'scrollable'}
          centered={viewportWidth > 600}
        >
          <Tab icon={<FaceIcon />} label='Hosts' />
          <Tab icon={<EventIcon />} label='Events' />
          <Tab icon={<LocationCityIcon />} label='Venues' />
          <Tab icon={<LocalShippingIcon />} label='Suppliers' />
          <Tab icon={<LocalFloristIcon />} label='Products' />
          <Tab icon={<ShoppingCartIcon />} label='Orders' />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis='x'
        index={value}
        onChangeIndex={index => setValue(index)}
        className={classes.tabs}
      >
        <TabContainer>
          <Hosts />
        </TabContainer>
        <TabContainer>
          <Events />
        </TabContainer>
        <TabContainer>
          <Venues />
        </TabContainer>
        <TabContainer>Suppliers</TabContainer>
        <TabContainer>Products</TabContainer>
        <TabContainer>Orders</TabContainer>
      </SwipeableViews>
    </div>
  )
}

export default connect(
  createStructuredSelector({
    viewportWidth: getViewportWidth,
  }),
)(App)
