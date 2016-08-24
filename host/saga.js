import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, match, nextPage, submitPage, changePage } from './actions'

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${submitPage}`)
    sendData('change page', payload)
    if(payload == "waiting" || payload == "experiment") yield call(sendData, 'all reset')
    if(payload ==     "result") {
      const { participants: participants } = yield select( participants => participants)
      var ans = [[0, 0], [0, 0]]
      if(participants != undefined){
        for(var i in participants) {
          if(participants[i].question2 != 0){
            ans[participants[i].question1 - 1][participants[i].question2 - 1]++
          }
        }
      }
      yield call(sendData, 'send result', {oneone: ans[0][0], onetwo: ans[0][1], twoone: ans[1][0], twotwo: ans[1][1]})
    }
    yield put(changePage(payload))
  }
}

function* nextPageSaga() {
  const pages = ["experiment", "result", "waiting"]
  while (true) {
    yield take(`${nextPage}`)
    const page = yield select(({ page }) => page)
    let next = pages[0]
    for (let i = 0; i < pages.length; i ++) {
      if (page == pages[i]) {
        next = pages[(i + 1) % pages.length]
        break
      }
    }
    yield put(submitPage(next))
  }
}

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* saga() {
  yield fork(changePageSaga)
  yield fork(nextPageSaga)
  yield fork(fetchContentsSaga)
}

export default saga