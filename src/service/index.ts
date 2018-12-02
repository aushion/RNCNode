// @ts-ignore
import { get } from '../utils/request'

function getTopicByTabName(name?: string, params?: {}) {
  const { page } = params
  return get(`topics${name ? `?tab=${name}&page=${page}` : ``}`, {
    timeout: 10000
  })
}

export { getTopicByTabName }
