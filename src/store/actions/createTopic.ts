import { createAction } from 'redux-actions'

/**
 * 创建文件时，用户身份的限制信息
 */
export const CreateTopic = createAction('CreateTopic', value => ({ next }) =>
  next({ value })
)
