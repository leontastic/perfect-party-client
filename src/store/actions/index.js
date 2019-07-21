import { createStandardAction } from 'typesafe-actions'
import { toUpper } from 'lodash'

export const loadHosts = createStandardAction('@HOSTS/LOAD')()
export const loadEvents = createStandardAction('@EVENTS/LOAD')()
export const loadVenues = createStandardAction('@VENUES/LOAD')()
export const loadSuppliers = createStandardAction('@SUPPLIERS/LOAD')()
export const loadFoodItems = createStandardAction('@PRODUCT/FOOD/LOAD')()
export const loadDecorItems = createStandardAction('@PRODUCT/DECOR/LOAD')()
export const loadEntertainment = createStandardAction('@PRODUCT/ENTERTAINMENT/LOAD')()
export const loadEntityCreator = entity => createStandardAction(`@${toUpper(entity)}/LOAD`)()

export const addHost = createStandardAction('@HOST/ADD')()
export const addEvent = createStandardAction('@EVENT/ADD')()
export const addVenue = createStandardAction('@VENUE/ADD')()
export const addSupplier = createStandardAction('@SUPPLIER/ADD')()
export const addProduct = createStandardAction('@PRODUCT/ADD')()

export const resizeViewport = createStandardAction('@VIEWPORT/RESIZE')()

export const goTo = createStandardAction('@HISTORY/NAVIGATE')()
export const goToActionCreator = url => createStandardAction('@HISTORY/NAVIGATE').map(() => ({ payload: url }))
export const setRoute = createStandardAction('@HISTORY/SET_ROUTE')()

export const submitForm = createStandardAction('@FORMS/SUBMIT')()
export const submitFormActionCreator = (entity, primaryKey, method) =>
  createStandardAction('@FORMS/SUBMIT').map(payload => ({ payload, meta: { entity, primaryKey, method } }))

export const setAddHostField = createStandardAction('@FORMS/ADD_HOST/SET_FIELD')()
export const setEditHostField = createStandardAction('@FORMS/EDIT_HOST/SET_FIELD')()
export const setAddSupplierField = createStandardAction('@FORMS/ADD_SUPPLIER/SET_FIELD')()
export const setEditSupplierField = createStandardAction('@FORMS/EDIT_SUPPLIER/SET_FIELD')()
export const setSearchProductType = createStandardAction('@FORMS/SEARCH_PRODUCT/SET_PRODUCT_TYPE')()
