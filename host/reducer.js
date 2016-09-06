import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import { changePage } from './actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    [changePage]: (_, { payload }) => ({ page: payload }),
    'join': ({ participants }, { payload: { id, participant, joined } }) => ({
      participants: Object.assign({}, participants, {[id]: participant}), joined: joined}),
    'answer': ({ participants }, { payload: { id, participant, answered } }) => ({
      participants: Object.assign({}, participants, {[id]: participant}), answered: answered}),
    'reset': (_, { payload: {participants, joined, answered} }) => ({
      participants: participants, joined: joined, answered: answered }),
    'result': (_, { payload: {one, two} }) => ({
      one: one, two: two, answered: 0 }),
    'qupdate': (_, { payload }) => ({ question_text: payload }),
  }, {}),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer