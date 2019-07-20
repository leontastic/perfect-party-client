import { call, put } from 'redux-saga/effects'
import fetchJson from './fetchJson'

export default function* fetchDispatch(url, action) {
  yield put(action(yield call(fetchJson, url)))
}
