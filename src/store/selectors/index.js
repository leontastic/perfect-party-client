import { find, get, identity, filter, flow, split, startsWith, toNumber } from 'lodash/fp'
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
export const createGetRouteStartsWith = match =>
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
export const getCurrentActivity = createDeepMemoizedSelector(getPathArray, get(1))
const getCurrentEntityId = createDeepMemoizedSelector(
  getPathArray,
  flow(
    get(2),
    toNumber,
  ),
)
export const getCurrentEntityPrimaryKey = createSelector(
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
export const createFormFieldsSelector = formName => state => state.forms[formName]
export const getSearchProductType = state => state.forms.searchProducts.productType
export const getSearchProductResults = createSelector(
  getSearchProductType,
  getProducts,
  (searchProductType, products) => products.filter(({ producttype }) => producttype === searchProductType),
)
