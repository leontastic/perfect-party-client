import { call } from 'redux-saga/effects'

export default function* fetchJson(url) {
  const response = yield call(fetch, url)
  try {
    return yield call([response, 'json'])
  } catch (err) {
    console.error(err)
    throw err
  }
}
