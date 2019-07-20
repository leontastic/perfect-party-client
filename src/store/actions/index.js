import { createStandardAction, createAsyncAction } from 'typesafe-actions'

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

export const createHost = createAsyncAction(
  '@HOST/CREATE/START',
  '@HOST/CREATE/FINISH',
  '@HOST/CREATE/ERROR',
  '@HOST/CREATE/CANCEL',
)()
export const createEvent = createAsyncAction(
  '@EVENT/CREATE/START',
  '@EVENT/CREATE/FINISH',
  '@EVENT/CREATE/ERROR',
  '@EVENT/CREATE/CANCEL',
)()
export const createVenue = createAsyncAction(
  '@VENUE/CREATE/START',
  '@VENUE/CREATE/FINISH',
  '@VENUE/CREATE/ERROR',
  '@VENUE/CREATE/CANCEL',
)()
export const createSupplier = createAsyncAction(
  '@SUPPLIER/CREATE/START',
  '@SUPPLIER/CREATE/FINISH',
  '@SUPPLIER/CREATE/ERROR',
  '@SUPPLIER/CREATE/CANCEL',
)()
export const createProduct = createAsyncAction(
  '@PRODUCT/CREATE/START',
  '@PRODUCT/CREATE/FINISH',
  '@PRODUCT/CREATE/ERROR',
  '@PRODUCT/CREATE/CANCEL',
)()

export const resizeViewport = createStandardAction('@VIEWPORT/RESIZE')()
