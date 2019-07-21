import { identity } from 'lodash'
import { all, call, put, spawn, takeEvery } from 'redux-saga/effects'
import {
  loadEntityCreator,
  goTo,
  loadEvents,
  loadHosts,
  loadSuppliers,
  loadVenues,
  loadFoodItems,
  loadDecorItems,
  loadEntertainment,
  submitForm,
} from '../actions'
import fetchDispatch from './fetchDispatch'
import history from './history'
import viewport from './viewport'
import { getType } from 'typesafe-actions'
import fetchJson from './fetchJson'

const HOSTNAME = 'http://localhost:8000'
const apiRoute = (...path) => [HOSTNAME, ...path].filter(identity).join('/')

function* loadInitial() {
  yield all([
    spawn(fetchDispatch, apiRoute('hosts'), loadHosts),
    spawn(fetchDispatch, apiRoute('events'), loadEvents),
    spawn(fetchDispatch, apiRoute('venues'), loadVenues),
    spawn(fetchDispatch, apiRoute('suppliers'), loadSuppliers),
    spawn(fetchDispatch, apiRoute('products', 'food'), loadFoodItems),
    spawn(fetchDispatch, apiRoute('products', 'decor'), loadDecorItems),
    spawn(fetchDispatch, apiRoute('products', 'entertainment'), loadEntertainment),
  ])
}

function* reloadEntity(entity) {
  yield call(fetchDispatch, apiRoute(entity), loadEntityCreator(entity))
  yield put(goTo(entity))
}

function* watchSubmitForm() {
  yield takeEvery(getType(submitForm), function*({
    meta: { entity, primaryKey, method },
    payload: { [primaryKey]: id, ...payload },
  }) {
    yield call(fetchJson, apiRoute(entity, id), { method, body: payload })
    yield call(reloadEntity, entity)
  })
}

export default function*() {
  yield all([spawn(history), spawn(viewport), spawn(loadInitial), spawn(watchSubmitForm)])
}
