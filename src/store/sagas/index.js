import { all, call, put, spawn, takeEvery } from 'redux-saga/effects'
import {
  goTo,
  loadEvents,
  loadHosts,
  loadSuppliers,
  loadVenues,
  submitAddHostForm,
  submitEditHostForm,
  submitDeleteHostForm,
} from '../actions'
import fetchDispatch from './fetchDispatch'
import history from './history'
import viewport from './viewport'
import { getType } from 'typesafe-actions'
import fetchJson from './fetchJson'

const HOSTNAME = 'http://localhost:8000'
const route = (...path) => [HOSTNAME, ...path].join('/')

function* loadInitial() {
  yield all([
    spawn(fetchDispatch, route('hosts'), loadHosts),
    spawn(fetchDispatch, route('events'), loadEvents),
    spawn(fetchDispatch, route('venues'), loadVenues),
    spawn(fetchDispatch, route('suppliers'), loadSuppliers),
  ])
}

function* watchSubmitForm() {
  yield all([
    takeEvery(getType(submitAddHostForm), function*({ payload }) {
      yield call(fetchJson, route('hosts'), { method: 'POST', body: payload })
      yield call(fetchDispatch, route('hosts'), loadHosts)
      yield put(goTo('/hosts'))
    }),
    takeEvery(getType(submitEditHostForm), function*({ payload: { hostid, ...host } }) {
      yield call(fetchJson, route('hosts', hostid), { method: 'PUT', body: host })
      yield call(fetchDispatch, route('hosts'), loadHosts)
      yield put(goTo('/hosts'))
    }),
    takeEvery(getType(submitDeleteHostForm), function*({ payload: { hostid } }) {
      yield call(fetchJson, route('hosts', hostid), { method: 'DELETE' })
      yield call(fetchDispatch, route('hosts'), loadHosts)
      yield put(goTo('/hosts'))
    }),
  ])
}

export default function*() {
  yield all([spawn(history), spawn(viewport), spawn(loadInitial), spawn(watchSubmitForm)])
}
