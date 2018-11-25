// @ts-ignore
import {get} from '../utils/request'

function getTopicByName(name:string) {
  return get(name,{timeout:1000});
}

export {
  getTopicByName
}
