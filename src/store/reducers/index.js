import { combineReducers } from 'redux'
import hosts from './hosts'
import events from './events'
import venues from './venues'
import viewport from './viewport'

export default combineReducers({
  hosts,
  events,
  venues,
  viewport,
})
