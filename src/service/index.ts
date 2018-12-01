// @ts-ignore
import { get } from '../utils/request'

function getTopicByTabName(name?: string) {
  return get(`topics${name ? `?tab=${name}` : ``}`, { timeout: 10000 })
}

export { getTopicByTabName }
