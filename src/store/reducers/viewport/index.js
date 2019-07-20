import { createReducer } from 'typesafe-actions'
import { resizeViewport } from '../../actions'

export default createReducer({
  width: window.innerWidth,
  height: window.innerWidth,
}).handleAction(resizeViewport, (state, { payload }) => payload)
