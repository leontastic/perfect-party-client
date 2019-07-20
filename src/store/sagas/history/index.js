import { eventChannel } from 'redux-saga'
import { all, call, put, spawn, takeEvery } from 'redux-saga/effects'
import { navigateTo, setRoute } from '../../actions'
import { getType } from 'typesafe-actions'

const routeUpdateChannel = eventChannel(emitter => {
  const emitRoute = () => emitter(window.location.pathname)
  window.addEventListener('popstate', emitRoute)
  return () => window.removeEventListener('popstate', emitRoute)
})

function* watchNavigateTo() {
  yield takeEvery(getType(navigateTo), function*({ payload: route, meta: title }) {
    const pathname = ['', ...route.split('/').filter(str => str)].join('/')
    yield call([window.history, 'pushState'], null, title, pathname)
    yield put(setRoute(route))
  })
}

function* updateRoute() {
  yield takeEvery(routeUpdateChannel, function*(pathname) {
    yield put(setRoute(pathname))
  })
}

export default function*() {
  yield all([spawn(watchNavigateTo), spawn(updateRoute)])
}
