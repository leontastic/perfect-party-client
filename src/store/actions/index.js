import { createStandardAction } from 'typesafe-actions'
import { toUpper } from 'lodash'

export const loadHosts = createStandardAction('@HOSTS/LOAD')()
export const loadEvents = createStandardAction('@EVENTS/LOAD')()
export const loadVenues = createStandardAction('@VENUES/LOAD')()
export const loadSuppliers = createStandardAction('@SUPPLIERS/LOAD')()
export const loadProducts = createStandardAction('@PRODUCTS/LOAD')()
export const loadEntityCreator = entity => createStandardAction(`@${toUpper(entity)}/LOAD`)()

export const addHost = createStandardAction('@HOST/ADD')()
export const addEvent = createStandardAction('@EVENT/ADD')()
export const addVenue = createStandardAction('@VENUE/ADD')()
export const addSupplier = createStandardAction('@SUPPLIER/ADD')()
export const addProduct = createStandardAction('@PRODUCT/ADD')()

export const resizeViewport = createStandardAction('@VIEWPORT/RESIZE')()

export const pushState = createStandardAction('@HISTORY/PUSH_STATE')()
export const replaceState = createStandardAction('@HISTORY/REPLACE_STATE')()
export const pushStateActionCreator = url => createStandardAction('@HISTORY/PUSH_STATE').map(() => ({ payload: url }))
export const setRoute = createStandardAction('@HISTORY/SET_ROUTE')()

export const submitForm = createStandardAction('@FORMS/SUBMIT')()
export const submitFormActionCreator = (entity, primaryKey, method) =>
  createStandardAction('@FORMS/SUBMIT').map(payload => ({ payload, meta: { entity, primaryKey, method } }))

export const setFormField = createStandardAction('@FORMS/SET_FIELD')()
export const createSetFormField = form =>
  createStandardAction('@FORMS/SET_FIELD').map((payload, field) => ({ payload, meta: { form, field } }))
export const setSearchProductType = createStandardAction('@FORMS/SEARCH_PRODUCT/SET_PRODUCT_TYPE')()

export const addProductToCart = createStandardAction('@CART/ADD_PRODUCT')()
export const removeProductFromCart = createStandardAction('@CART/REMOVE_PRODUCT')()
