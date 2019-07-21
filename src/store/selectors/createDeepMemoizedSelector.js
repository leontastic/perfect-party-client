import { isEqual } from 'lodash'
import { createSelectorCreator, defaultMemoize } from 'reselect'

const createDeepMemoizedSelector = createSelectorCreator(defaultMemoize, isEqual)

export default createDeepMemoizedSelector
