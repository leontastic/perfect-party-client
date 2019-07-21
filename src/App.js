import { startCase } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Container, Fab, Slide, Tab, Tabs, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddOutlined'
import EventIcon from '@material-ui/icons/EventOutlined'
import FaceIcon from '@material-ui/icons/FaceOutlined'
import LocalFloristIcon from '@material-ui/icons/LocalFloristOutlined'
import LocalShippingIcon from '@material-ui/icons/LocalShippingOutlined'
import LocationCityIcon from '@material-ui/icons/LocationCityOutlined'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined'
import { grey } from '@material-ui/core/colors'

import Logo from './components/Logo'
import { getTab, getViewportWidth } from './store/selectors'
import './App.css'
import Hosts from './views/Hosts'
import Events from './views/Events'
import Venues from './views/Venues'
import Suppliers from './views/Suppliers'
import { goTo } from './store/actions'
import * as HostForm from './views/HostForm'
import * as DeleteForm from './views/DeleteForm'

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
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  fabIcon: {
    marginRight: theme.spacing(1),
  },
}))

const App = ({ viewportWidth, currentTab, goTo }) => {
  const classes = useStyles()
  const tabs = [
    {
      entity: 'hosts',
      view: <Hosts />,
      icon: <FaceIcon />,
      action: ['Add Host', 'hosts/new'],
    },
    {
      entity: 'events',
      icon: <EventIcon />,
      view: <Events />,
      action: ['Add Event', 'events/new'],
    },
    {
      entity: 'venues',
      icon: <LocationCityIcon />,
      view: <Venues />,
      action: ['Add Venue', 'venues/new'],
    },
    {
      entity: 'suppliers',
      icon: <LocalShippingIcon />,
      view: <Suppliers />,
      action: ['Add Supplier', 'suppliers/new'],
    },
    {
      entity: 'products',
      icon: <LocalFloristIcon />,
      view: 'Products',
      action: ['Add Product', 'products/new'],
    },
    {
      entity: 'orders',
      icon: <ShoppingCartIcon />,
      view: 'Orders',
    },
  ]

  const currentTabIndex = tabs.findIndex(({ entity }) => entity === currentTab)

  const renderTabNavButton = ({ icon, entity }, index) => (
    <Tab key={index} icon={icon} label={startCase(entity)} value={entity} />
  )

  const renderTabView = ({ view }, index) => <TabContainer key={index}>{view}</TabContainer>

  const renderTabAction = ({ action: [label, route] = [] }, index) =>
    label &&
    route && (
      <Slide
        key={index}
        direction='up'
        className={classes.fab}
        in={currentTabIndex === index}
        timeout={{ enter: 500, exit: 200 }}
        mountOnEnter
        unmountOnExit
      >
        <Fab variant='extended' color='primary' className={classes.fab} onClick={() => goTo(route)}>
          <AddIcon className={classes.fabIcon} />
          {label}
        </Fab>
      </Slide>
    )

  return (
    <div className={classes.root}>
      <AppBar position='static' classes={{ root: classes.appbar }}>
        <Logo />
        <Tabs
          value={currentTab}
          onChange={(event, entity) => goTo(entity)}
          variant={viewportWidth > 600 ? 'standard' : 'scrollable'}
          centered={viewportWidth > 600}
        >
          {tabs.map(renderTabNavButton)}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis='x'
        index={currentTabIndex}
        onChangeIndex={index => goTo(tabs[index].entity)}
        className={classes.tabs}
        springConfig={{
          duration: '0.5s',
          easeFunction: 'ease',
          delay: '0s',
        }}
      >
        {tabs.map(renderTabView)}
      </SwipeableViews>
      {tabs.map(renderTabAction)}
      {[...Object.values(HostForm), ...Object.values(DeleteForm)].map((HostForm, index) => (
        <HostForm key={index} />
      ))}
    </div>
  )
}

export default connect(
  createStructuredSelector({
    viewportWidth: getViewportWidth,
    currentTab: getTab,
  }),
  {
    goTo,
  },
)(App)
