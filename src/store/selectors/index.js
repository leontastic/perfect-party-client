export const getViewportWidth = state => state.viewport.width
export const getViewportHeight = state => state.viewport.height
export const getEvents = state => state.events
export const getHosts = state => state.hosts
export const getVenues = state => state.venues
export const getSuppliers = state => state.suppliers
export const getRoute = state => state.route
export const getTab = state => state.route.split('/').filter(str => str)[0]
