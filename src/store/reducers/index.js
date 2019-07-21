import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import {
  loadEvents,
  loadHosts,
  loadProducts,
  loadSuppliers,
  loadVenues,
  resizeViewport,
  setRoute,
  setSearchProductType,
  setFormField,
} from '../actions'

const setPayload = (_, { payload }) => payload
const hosts = createReducer([]).handleAction(loadHosts, setPayload)
const events = createReducer([]).handleAction(loadEvents, setPayload)
const venues = createReducer([]).handleAction(loadVenues, setPayload)
const suppliers = createReducer([]).handleAction(loadSuppliers, setPayload)
const products = createReducer([]).handleAction(loadProducts, setPayload)
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
  searchProducts: combineReducers({
    productType: createReducer('FoodItem').handleAction(setSearchProductType, setPayload),
  }),
})

export default combineReducers({
  hosts,
  events,
  venues,
  suppliers,
  products,
  viewport,
  route,
  forms,
})
