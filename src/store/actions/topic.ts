import { createAction } from 'redux-actions'
import { getTopicByTabName } from '../../service'

/**
 * 创建文件时，用户身份的限制信息
 */
export const getTopicByTabNameAction = createAction(
  'getTopicByTabNameAction',
  args => getTopicByTabName(args)
)

export const clearTopicAction = createAction('clearTopicAction')
