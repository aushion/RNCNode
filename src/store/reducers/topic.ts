import { Topic } from '../records'
import { handleActions } from 'redux-actions'
import { getTopicByTabNameAction, clearTopicAction } from '../actions'
import Immutable from 'immutable'

export const topic = handleActions(
  {
    [getTopicByTabNameAction](state, { payload }) {
      payload.data.forEach(topic => {
        const jsFormTopic = getJsFormTopic(topic)
        const topicRecord = new Topic(jsFormTopic)
        state = state.push(topicRecord)
      })
      return state
    },
    [clearTopicAction]() {
      return Immutable.List()
    }
  },
  Immutable.Map()
)

function getJsFormTopic(topic) {
  for (const key in topic) {
    if (topic.hasOwnProperty(key)) {
      const value = topic[key]
      switch (key) {
        case 'author_id':
          topic.authorId = value
          delete topic['author_id']
          break
        case 'create_at':
          topic.createdAt = value
          delete topic['create_at']
          break
        case 'last_reply_at':
          topic.lastRepliedAt = value
          delete topic['last_reply_at']
          break
        case 'reply_count':
          topic.replyCount = value
          delete topic['reply_count']
          break
        case 'visit_count':
          topic.visitCount = value
          delete topic['visit_count']
          break
        case 'author':
          topic.author = {
            loginName: value.loginname,
            avatarUrl: value.avatar_url
          }
          break
      }
    }
  }

  return topic
}
