import { union } from 'lodash'
import { createReducer } from 'typesafe-actions'
import { addVenues } from '../../actions'

export default createReducer([]).handleAction(
  addVenues,
  (state, { payload: venues }) => union(state, venues),
)
