import React from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import { createStructuredSelector } from 'reselect'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import './App.css'
import { getViewportWidth } from './store/selectors/viewport'

const TabContainer = props => (
  <Typography component='div' style={{ padding: 8 * 3 }}>
    {props.children}
  </Typography>
)

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    flex: 1,
  },
}))

const App = ({ viewportWidth }) => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          variant={viewportWidth > 600 ? 'standard' : 'scrollable'}
          centered={viewportWidth > 600}
        >
          <Tab label='Hosts' />
          <Tab label='Events' />
          <Tab label='Venues' />
          <Tab label='Suppliers' />
          <Tab label='Products' />
          <Tab label='Orders' />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis='x'
        index={value}
        onChangeIndex={setValue}
        className={classes.tabs}
      >
        <TabContainer>Hosts</TabContainer>
        <TabContainer>Events</TabContainer>
        <TabContainer>Venues</TabContainer>
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
