import { eventChannel } from 'redux-saga'
import { startCase } from 'lodash'
import { all, call, put, select, spawn, takeEvery } from 'redux-saga/effects'
import { goTo, setRoute } from '../../actions'
import { getType } from 'typesafe-actions'
import { getTab } from '../../selectors'

const routeUpdateChannel = eventChannel(emitter => {
  const emitRoute = () => emitter(window.location.pathname)
  window.addEventListener('popstate', emitRoute)
  return () => window.removeEventListener('popstate', emitRoute)
})

function* watchGoTo() {
  yield takeEvery(getType(goTo), function*({ payload: route, meta: title }) {
    const pathname = ['', ...route.split('/').filter(str => str)].join('/')
    yield call([window.history, 'pushState'], null, title, pathname)
    yield put(setRoute(pathname))
  })
}

function* updateRoute() {
  yield takeEvery(routeUpdateChannel, function*(pathname) {
    yield put(setRoute(pathname))
  })
}

function* updateDocumentTitle() {
  document.title = startCase(yield select(getTab))
  yield takeEvery(getType(setRoute), function*() {
    document.title = startCase(yield select(getTab))
  })
}

export default function*() {
  yield all([spawn(watchGoTo), spawn(updateRoute), spawn(updateDocumentTitle)])
}
