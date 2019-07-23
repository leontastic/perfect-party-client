import { get, groupBy, mapValues } from 'lodash'
import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import {
  addProductToCart,
  loadEvents,
  loadHosts,
  loadOrders,
  loadProducts,
  loadSuppliers,
  loadVenues,
  removeProductFromCart,
  resizeViewport,
  setFormField,
  setRoute,
  setSearchProductType,
} from '../actions'

const setPayload = (_, { payload }) => payload
const hosts = createReducer([]).handleAction(loadHosts, setPayload)
const events = createReducer([]).handleAction(loadEvents, setPayload)
const venues = createReducer([]).handleAction(loadVenues, setPayload)
const suppliers = createReducer([]).handleAction(loadSuppliers, setPayload)
const products = createReducer([]).handleAction(loadProducts, setPayload)
const orders = createReducer([]).handleAction(loadOrders, (_, { payload }) =>
  mapValues(groupBy(payload, 'eventid'), orders => groupBy(orders, 'ordertime')),
)
const viewport = createReducer({
  width: window.innerWidth,
  height: window.innerWidth,
}).handleAction(resizeViewport, setPayload)
const route = createReducer(window.location.pathname).handleAction(setRoute, setPayload)
const formFieldsReducer = formName =>
  createReducer({})
    .handleAction(setFormField, (state, { payload, meta: { form, field } }) =>
      form === formName ? { ...state, [field]: payload } : state,
    )
    .handleAction(setRoute, () => ({}))

const forms = combineReducers({
  addHost: formFieldsReducer('addHost'),
  editHost: formFieldsReducer('editHost'),
  addSupplier: formFieldsReducer('addSupplier'),
  editSupplier: formFieldsReducer('editSupplier'),
  addProduct: formFieldsReducer('addProduct'),
  editProduct: formFieldsReducer('editProduct'),
  addVenue: formFieldsReducer('addVenue'),
  editVenue: formFieldsReducer('editVenue'),
  addEvent: formFieldsReducer('addEvent'),
  editEvent: formFieldsReducer('editEvent'),
  searchProducts: combineReducers({
    productType: createReducer('FoodItem').handleAction(setSearchProductType, setPayload),
  }),
})
const cart = createReducer({})
  .handleAction(addProductToCart, (state, { payload, meta }) => ({
    ...state,
    [meta]: { ...state[meta], [payload]: get(state, [meta, payload], 0) + 1 },
  }))
  .handleAction(removeProductFromCart, (state, { payload, meta }) => ({
    ...state,
    [meta]: { ...state[meta], [payload]: Math.max(0, get(state, [meta, payload], 0) - 1) },
  }))

export default combineReducers({
  hosts,
  events,
  venues,
  suppliers,
  products,
  viewport,
  route,
  forms,
  cart,
  orders,
})
