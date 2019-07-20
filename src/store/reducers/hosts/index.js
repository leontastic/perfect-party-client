import { union } from 'lodash'
import { createReducer } from 'typesafe-actions'
import { addHosts } from '../../actions'

export default createReducer([]).handleAction(
  addHosts,
  (state, { payload: hosts }) => union(state, hosts),
)
