import { filter, find, flow, get, identity, split, startsWith, sum, toNumber, values } from 'lodash/fp'
import { createSelector } from 'reselect'
import createDeepMemoizedSelector from './createDeepMemoizedSelector'
import { PRIMARY_KEYS } from '../../utils/constants'

export const getViewportWidth = state => state.viewport.width
export const getViewportHeight = state => state.viewport.height
export const getEvents = state => state.events
export const getHosts = state => state.hosts
export const getVenues = state => state.venues
export const getSuppliers = state => state.suppliers
export const getProducts = state => state.products
export const getRoute = state => state.route
export const createRouteStartsWithSelector = match =>
  createSelector(
    getRoute,
    startsWith(match),
  )
export const getPathArray = createSelector(
  getRoute,
  flow(
    split('/'),
    filter(identity),
  ),
)
export const getCurrentEntity = createDeepMemoizedSelector(getPathArray, get(0))
const getCurrentEntityId = createDeepMemoizedSelector(
  getPathArray,
  flow(
    get(2),
    toNumber,
  ),
)
const getCurrentEntityPrimaryKey = createSelector(
  getCurrentEntity,
  entity => PRIMARY_KEYS[entity],
)
const createActiveEntitySelector = (entityName, selectRecords) =>
  createSelector(
    getCurrentEntity,
    getCurrentEntityId,
    getCurrentEntityPrimaryKey,
    selectRecords,
    (entity, id, pk, records) => (entity === entityName ? find({ [pk]: id })(records) : undefined),
  )
export const getCurrentHost = createActiveEntitySelector('hosts', getHosts)
export const getCurrentSupplier = createActiveEntitySelector('suppliers', getSuppliers)
export const getCurrentProduct = createActiveEntitySelector('products', getProducts)
export const getCurrentEvent = createActiveEntitySelector('events', getEvents)
export const getCurrentVenue = createActiveEntitySelector('venues', getVenues)
export const createFormFieldsSelector = formName => state => state.forms[formName]
export const getSearchProductType = state => state.forms.searchProducts.productType
export const getSearchProductResults = createSelector(
  getSearchProductType,
  getProducts,
  (searchProductType, products) => products.filter(({ producttype }) => producttype === searchProductType),
)
export const getCurrentEventVenueId = createDeepMemoizedSelector(getCurrentEvent, get('venueid'))
const getUpdatedEventVenueId = createDeepMemoizedSelector(createFormFieldsSelector('editEvent'), get('venueid'))
const getNewEventVenueId = createDeepMemoizedSelector(createFormFieldsSelector('addEvent'), get('venueid'))
const getUpdatedEventVenue = createSelector(
  getUpdatedEventVenueId,
  getVenues,
  (venueid, venues) => venueid && find({ venueid })(venues),
)
const getNewEventVenue = createSelector(
  getNewEventVenueId,
  getVenues,
  (venueid, venues) => venueid && find({ venueid })(venues),
)
export const getNewEventVenuePrice = createDeepMemoizedSelector(getNewEventVenue, get('price'))
export const getUpdatedEventVenuePrice = createSelector(
  getUpdatedEventVenue,
  get('price'),
)
export const getCurrentEventVenueInvoicePrice = createSelector(
  getCurrentEvent,
  get('venueprice'),
)
export const getCart = state => state.cart
export const getCurrentEventCartQuantities = createDeepMemoizedSelector(
  getCurrentEvent,
  getCart,
  ({ eventid } = {}, { [eventid]: eventCart }) => ({ ...eventCart }),
)
export const getCurrentEventCartProducts = createSelector(
  getCurrentEventCartQuantities,
  getProducts,
  (quantities, products) =>
    Object.keys(quantities)
      .map(toNumber)
      .map(productid => find({ productid })(products)),
)
export const getCurrentEventCartProductCount = createSelector(
  getCurrentEventCartQuantities,
  flow(
    values,
    sum,
  ),
)
export const getCurrentEventCartValue = createSelector(
  getCurrentEventCartProducts,
  getCurrentEventCartQuantities,
  (products, quantities) => sum(products.map(({ price, productid }) => price * quantities[productid])),
)
