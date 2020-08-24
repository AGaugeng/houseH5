
import {
  UPDATE_MESSAGES_DATA,
  UPDATE_UNREADCOUNT,
  UPDATE_PUSH_MESSAGES,
  UPDATE_MESSAGES_CONTENT
} from '../../actions/actionTypes'
/* import {
  WEBSOCKET_MESSAGE
} from '../../../plugin/websocket/types' */

let initialState = {
  messages: [],
  unreadCount: 0, //未读消息
  pushmessages: [],
  count: 0
}
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_UNREADCOUNT:
      return { ...state, unreadCount: state.unreadCount = action.unreadCount }
    case UPDATE_MESSAGES_DATA:
      return { ...state, messages: state.messages = action.messages }
    case UPDATE_PUSH_MESSAGES:
      return { ...state, pushmessages: state.pushmessages = action.pushmessages }
    case UPDATE_MESSAGES_CONTENT:
      return { ...state, count: state.count = action.count }

    /* case WEBSOCKET_MESSAGE:
    return { ...state, message: state.message = action.payload.data } */
    default:
      return state
  }
}
