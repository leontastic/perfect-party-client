import React from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import { createStructuredSelector } from 'reselect'

import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Container,
  Fab,
  Slide,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddOutlined'
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
import Suppliers from './views/Suppliers'
import {
  createHost,
  createEvent,
  createVenue,
  createSupplier,
  createProduct,
} from './store/actions'

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

const App = ({
  viewportWidth,
  createHost,
  createEvent,
  createVenue,
  createSupplier,
  createProduct,
}) => {
  const classes = useStyles()
  const tabs = [
    {
      route: '/hosts',
      name: 'Hosts',
      content: <Hosts />,
      icon: <FaceIcon />,
      action: ['Add Host', createHost],
    },
    {
      route: '/events',
      name: 'Events',
      icon: <EventIcon />,
      content: <Events />,
      action: ['Add Event', createEvent],
    },
    {
      route: '/venues',
      name: 'Venues',
      icon: <LocationCityIcon />,
      content: <Venues />,
      action: ['Add Venue', createVenue],
    },
    {
      route: '/suppliers',
      name: 'Suppliers',
      icon: <LocalShippingIcon />,
      content: <Suppliers />,
      action: ['Add Supplier', createSupplier],
    },
    {
      route: '/products',
      name: 'Products',
      icon: <LocalFloristIcon />,
      content: 'Products',
      action: ['Add Product', createProduct],
    },
    {
      route: '/orders',
      name: 'Orders',
      icon: <ShoppingCartIcon />,
      content: 'Orders',
    },
  ]
  const [currentPageRoute, setCurrentPageRoute] = React.useState(
    window.location.pathname,
  )
  const currentTabIndex = tabs.findIndex(
    ({ route }) => route === currentPageRoute,
  )

  return (
    <div className={classes.root}>
      <AppBar position='static' classes={{ root: classes.appbar }}>
        <Logo />
        <Tabs
          value={currentPageRoute}
          onChange={(event, route) => setCurrentPageRoute(route)}
          variant={viewportWidth > 600 ? 'standard' : 'scrollable'}
          centered={viewportWidth > 600}
        >
          {tabs.map(({ icon, name, route }, index) => (
            <Tab key={index} icon={icon} label={name} value={route} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis='x'
        index={currentTabIndex}
        onChangeIndex={index => setCurrentPageRoute(tabs[index].route)}
        className={classes.tabs}
        springConfig={{
          duration: '0.5s',
          easeFunction: 'ease',
          delay: '0s',
        }}
      >
        {tabs.map(({ route, content }, index) => (
          <TabContainer key={index}>{content}</TabContainer>
        ))}
      </SwipeableViews>
      {tabs.map(
        ({ action: [label, action] = [] }, index) =>
          label &&
          action && (
            <Slide
              key={index}
              direction='up'
              className={classes.fab}
              in={currentTabIndex === index}
              timeout={{ enter: 500, exit: 200 }}
              mountOnEnter
              unmountOnExit
            >
              <Fab
                variant='extended'
                color='primary'
                className={classes.fab}
                onClick={() => action()}
              >
                <AddIcon className={classes.fabIcon} />
                {label}
              </Fab>
            </Slide>
          ),
      )}
    </div>
  )
}

export default connect(
  createStructuredSelector({
    viewportWidth: getViewportWidth,
  }),
  {
    createHost: createHost.request,
    createEvent: createEvent.request,
    createVenue: createVenue.request,
    createSupplier: createSupplier.request,
    createProduct: createProduct.request,
  },
)(App)
