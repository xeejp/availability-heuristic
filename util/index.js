import { ReadJSON } from '../util/ReadJSON'

export function getPage(page) {
  switch(page) {
    case 'waiting':
      return ReadJSON().static_text["util_index"]["waiting"]
    case 'description':
      return ReadJSON().static_text["util_index"]["description"]
    case 'experiment':
      return ReadJSON().static_text["util_index"]["experiment"]
    case 'result':
      return ReadJSON().static_text["util_index"]["result"]
    default:
      return page
  }
}
