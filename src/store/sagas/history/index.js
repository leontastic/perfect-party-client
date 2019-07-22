import { eventChannel } from 'redux-saga'
import { startCase } from 'lodash'
import { all, call, put, select, spawn, takeEvery } from 'redux-saga/effects'
import { pushState, setRoute, replaceState } from '../../actions'
import { getType } from 'typesafe-actions'
import { getCurrentEntity } from '../../selectors'

const routeUpdateChannel = eventChannel(emitter => {
  const emitRoute = () => emitter(window.location.pathname)
  window.addEventListener('popstate', emitRoute)
  return () => window.removeEventListener('popstate', emitRoute)
})

function* watchReplaceState() {
  yield takeEvery(getType(replaceState), function*({ payload: route }) {
    const pathname = ['', ...route.split('/').filter(str => str)].join('/')
    yield call([window.history, 'replaceState'], null, null, pathname)
    yield put(setRoute(pathname))
  })
}

function* watchPushState() {
  yield takeEvery(getType(pushState), function*({ payload: route }) {
    const pathname = ['', ...route.split('/').filter(str => str)].join('/')
    yield call([window.history, 'pushState'], null, null, pathname)
    yield put(setRoute(pathname))
  })
}

function* updateRoute() {
  if (!(yield select(getCurrentEntity))) yield put(replaceState('hosts'))
  yield takeEvery(routeUpdateChannel, function*(pathname) {
    if (!(yield select(getCurrentEntity))) yield put(replaceState('hosts'))
    else yield put(setRoute(pathname))
  })
}

function* updateDocumentTitle() {
  document.title = startCase(yield select(getCurrentEntity))
  yield takeEvery(getType(setRoute), function*() {
    document.title = startCase(yield select(getCurrentEntity))
  })
}

export default function*() {
  yield all([spawn(watchPushState), spawn(watchReplaceState), spawn(updateRoute), spawn(updateDocumentTitle)])
}
