import { combineReducers } from 'redux'

import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'change page': (_, { payload }) => ({ page: payload }),
    'next question': (_, { payload }) => ( (payload.next == "question2")? { sequence: payload.next, question1: payload.selected } : {sequence: payload.next, question2: payload.selected})
  }),
  handleAction('update contents', () => ({ loading: false }), { loading: true }),
])

export default reducer
