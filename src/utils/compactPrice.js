import { flow, toNumber } from 'lodash/fp'

const compactPrice = flow(
  toNumber,
  number => [number, Math.floor(Math.log10(number))],
  ([number, base]) => (base >= 3 ? `~$${Math.round(number / Math.pow(10, base - 1))}K` : `$${number}`),
)

export default compactPrice
