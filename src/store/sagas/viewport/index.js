import { put, takeEvery } from 'redux-saga/effects'
import { resizeViewport } from '../../actions'
import { eventChannel } from 'redux-saga'

const viewportDimensionsChannel = eventChannel(emitter => {
  const emitViewportDimensions = () => emitter({ width: window.innerWidth, height: window.innerHeight })

  window.addEventListener('resize', emitViewportDimensions)
  window.addEventListener('orientationchange', emitViewportDimensions)

  return () => {
    window.removeEventListener('resize', emitViewportDimensions)
    window.removeEventListener('orientationchange', emitViewportDimensions)
  }
})

export default function*() {
  yield takeEvery(viewportDimensionsChannel, function*({ width, height }) {
    yield put(resizeViewport({ width, height }))
  })
}
