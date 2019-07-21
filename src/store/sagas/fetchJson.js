import { call } from 'redux-saga/effects'

export default function* fetchJson(url, { headers, body, ...opts } = {}) {
  try {
    const response = yield call(fetch, url, {
      ...opts,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error(response.statusText)
    return yield call([response, 'json'])
  } catch (err) {
    console.error(err)
  }
}
