import { createStandardAction } from 'typesafe-actions'

export const addHosts = createStandardAction('@HOSTS/ADD')()
export const addEvents = createStandardAction('@EVENTS/ADD')()
export const addVenues = createStandardAction('@VENUES/ADD')()
export const resizeViewport = createStandardAction('@VIEWPORT/RESIZE')()
