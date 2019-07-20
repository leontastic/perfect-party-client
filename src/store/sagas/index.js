import { all, spawn } from 'redux-saga/effects'
import { addHosts, addEvents } from '../actions'
import fetchDispatch from './fetchDispatch'
import viewport from './viewport'

const HOSTNAME = 'http://localhost:8000'
const route = (...path) => `${HOSTNAME}/${path.join('/')}`

export default function*() {
  yield all([
    spawn(viewport),
    spawn(fetchDispatch, route('hosts'), addHosts),
    spawn(fetchDispatch, route('events'), addEvents),
  ])
}
