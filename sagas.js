import { put, takeEvery, all, call } from 'redux-saga/effects'

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* helloSaga() {
  console.log('Hello Sagas!')
}

// Наша рабочая Сага: выполнит задачу асинхронного инкремента
export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT' })
}

// Наша Сага о наблюдателе: создавайте новую задачу incrementAsync для каждого INCREMENT_ASYNC
function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// обратите внимание, что теперь мы экспортируем только корневую сагу
// единая точка входа, чтобы начать все саги сразу
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
  // yield helloSaga()
  // yield watchIncrementAsync()
}
