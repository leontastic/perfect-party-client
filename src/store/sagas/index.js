import { all, spawn } from 'redux-saga/effects'
import { loadHosts, loadEvents, loadVenues, loadSuppliers } from '../actions'
import fetchDispatch from './fetchDispatch'
import history from './history'
import viewport from './viewport'

const HOSTNAME = 'http://localhost:8000'
const route = (...path) => `${HOSTNAME}/${path.join('/')}`

function* loadInitial() {
  yield all([
    spawn(fetchDispatch, route('hosts'), loadHosts),
    spawn(fetchDispatch, route('events'), loadEvents),
    spawn(fetchDispatch, route('venues'), loadVenues),
    spawn(fetchDispatch, route('suppliers'), loadSuppliers),
  ])
}

export default function*() {
  yield all([spawn(history), spawn(viewport), spawn(loadInitial)])
}
