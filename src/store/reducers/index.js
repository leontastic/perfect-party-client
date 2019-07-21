import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import {
  loadHosts,
  loadEvents,
  loadVenues,
  loadSuppliers,
  resizeViewport,
  setRoute,
  setAddHostField,
  setEditHostField,
  setAddSupplierField,
  setEditSupplierField,
} from '../actions'

const setPayload = (_, { payload }) => payload
const setPayloadAtMetaKey = (state, { payload, meta }) => ({ ...state, [meta]: payload })
const hosts = createReducer([]).handleAction(loadHosts, setPayload)
const events = createReducer([]).handleAction(loadEvents, setPayload)
const venues = createReducer([]).handleAction(loadVenues, setPayload)
const suppliers = createReducer([]).handleAction(loadSuppliers, setPayload)
const viewport = createReducer({
  width: window.innerWidth,
  height: window.innerWidth,
}).handleAction(resizeViewport, setPayload)
const route = createReducer(window.location.pathname).handleAction(setRoute, setPayload)
const forms = combineReducers({
  addHost: combineReducers({
    fields: createReducer({})
      .handleAction(setAddHostField, setPayloadAtMetaKey)
      .handleAction(setRoute, () => ({})),
  }),
  editHost: combineReducers({
    fields: createReducer({})
      .handleAction(setEditHostField, setPayloadAtMetaKey)
      .handleAction(setRoute, () => ({})),
  }),
  addSupplier: combineReducers({
    fields: createReducer({})
      .handleAction(setAddSupplierField, setPayloadAtMetaKey)
      .handleAction(setRoute, () => ({})),
  }),
  editSupplier: combineReducers({
    fields: createReducer({})
      .handleAction(setEditSupplierField, setPayloadAtMetaKey)
      .handleAction(setRoute, () => ({})),
  }),
})

export default combineReducers({
  hosts,
  events,
  venues,
  suppliers,
  viewport,
  route,
  forms,
})
