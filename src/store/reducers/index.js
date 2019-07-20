import { combineReducers } from 'redux'
import hosts from './hosts'
import events from './events'

export default combineReducers({
  hosts,
  events,
})
