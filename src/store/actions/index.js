import { createStandardAction } from 'typesafe-actions'

export const loadHosts = createStandardAction('@HOSTS/LOAD')()
export const loadEvents = createStandardAction('@EVENTS/LOAD')()
export const loadVenues = createStandardAction('@VENUES/LOAD')()
export const loadSuppliers = createStandardAction('@SUPPLIERS/LOAD')()
export const loadProducts = createStandardAction('@PRODUCT/LOAD')

export const addHost = createStandardAction('@HOST/ADD')()
export const addEvent = createStandardAction('@EVENT/ADD')()
export const addVenue = createStandardAction('@VENUE/ADD')()
export const addSupplier = createStandardAction('@SUPPLIER/ADD')()
export const addProduct = createStandardAction('@PRODUCT/ADD')()

export const resizeViewport = createStandardAction('@VIEWPORT/RESIZE')()

export const goTo = createStandardAction('@HISTORY/NAVIGATE')()
export const createGoTo = url => createStandardAction('@HISTORY/NAVIGATE').map(() => ({ payload: url }))
export const setRoute = createStandardAction('@HISTORY/SET_ROUTE')()

export const submitAddHostForm = createStandardAction('@FORMS/ADD_HOST/SUBMIT')()
export const submitEditHostForm = createStandardAction('@FORMS/EDIT_HOST/SUBMIT')()
export const submitDeleteHostForm = createStandardAction('@FORMS/DELETE_HOST/SUBMIT')()
export const setAddHostField = createStandardAction('@FORMS/ADD_HOST/SET_FIELD')()
export const setEditHostField = createStandardAction('@FORMS/EDIT_HOST/SET_FIELD')()
