import { union } from 'lodash'
import { createReducer } from 'typesafe-actions'
import { addEvents } from '../../actions'

export default createReducer([]).handleAction(
  addEvents,
  (state, { payload: events }) => union(state, events),
)
