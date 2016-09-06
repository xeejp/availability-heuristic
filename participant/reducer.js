import { combineReducers } from 'redux'

import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'change page': (_, { payload }) => ({ page: payload }),
    'joined': (_, { payload }) => ({ joined: payload }),
    'next question': (_, { payload }) => ( { sequence: payload.next, question1: payload.selected } ),
    'reset': (_, { payload }) => ( { sequence: payload.sequence, question1: payload.question1, active: payload.active, qswap: payload.qswap, question_text: payload.question_text }),
    'result': (_, { payload: {one, two} }) => ({
      one: one, two: two }),
    'qupdate': (_, { payload }) => ({ question_text: payload }),
  }),
  handleAction('update contents', () => ({ loading: false }), { loading: true }),
])

export default reducer