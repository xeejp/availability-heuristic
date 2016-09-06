import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, nextQuestion } from './actions'

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* nextQuestionSaga() {
  const sequences = ["question1", "answered"]
  while(true){
    const { payload: { selected } } = yield take(`${nextQuestion}`)
    const sequence = yield select(({ sequence }) => sequence)
    let next = sequences[0]
    for(let i = 0; i < sequences.length; i++) {
      if(sequence == sequences[i]) {
        next = sequences[(i + 1) % sequences.length]
        break
      }
    }
    yield call(sendData, 'next question', {selected: selected, next: next})
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(nextQuestionSaga)
}

export default saga
