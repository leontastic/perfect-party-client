import { find, startsWith, toNumber } from 'lodash/fp'
import { createSelector } from 'reselect'

export const getViewportWidth = state => state.viewport.width
export const getViewportHeight = state => state.viewport.height
export const getEvents = state => state.events
export const getHosts = state => state.hosts
export const getVenues = state => state.venues
export const getSuppliers = state => state.suppliers
export const getProducts = state => state.products
export const getRoute = state => state.route
export const getTab = state => state.route.split('/').filter(str => str)[0]
export const createGetRouteStartsWith = match =>
  createSelector(
    getRoute,
    startsWith(match),
  )
const getEntityId = createSelector(
  getRoute,
  route => {
    const id = route.split('/')[3]
    return id && toNumber(id)
  },
)
export const getContextHost = createSelector(
  getHosts,
  getEntityId,
  (hosts, hostid) => find({ hostid })(hosts),
)
export const getContextSupplier = createSelector(
  getSuppliers,
  getEntityId,
  (suppliers, supplierid) => find({ supplierid })(suppliers),
)
export const createGetFormFields = formName => state => state.forms[formName].fields
export const getSearchProductType = state => state.forms.searchProducts.productType
export const getSearchProductResults = createSelector(
  getSearchProductType,
  getProducts,
  (searchProductType, products) => products[searchProductType],
)
