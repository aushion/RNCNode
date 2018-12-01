import { Topic } from '../records'
import { handleActions } from 'redux-actions'
import { CreateTopic } from '../actions'

export const topic = handleActions(
  {
    [CreateTopic](state, { value }) {
      return state.set('topic', value)
    }
  },
  Topic()
)
