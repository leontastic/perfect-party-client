import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import { loadHosts, loadEvents, loadVenues, loadSuppliers, resizeViewport, setRoute } from '../actions'

const setPayload = (_, { payload }) => payload
const hosts = createReducer([]).handleAction(loadHosts, setPayload)
const events = createReducer([]).handleAction(loadEvents, setPayload)
const venues = createReducer([]).handleAction(loadVenues, setPayload)
const suppliers = createReducer([]).handleAction(loadSuppliers, setPayload)
const viewport = createReducer({
  width: window.innerWidth,
  height: window.innerWidth,
}).handleAction(resizeViewport, setPayload)
const route = createReducer(window.location.pathname).handleAction(setRoute, setPayload)

export default combineReducers({
  hosts,
  events,
  venues,
  suppliers,
  viewport,
  route,
})
