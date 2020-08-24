
import { UPDATE_USER_BUY_OPENID, UPDATE_WECHAT_CODE, UPDATE_USER_OPENID, UPDATE_WECHAT_STATE, UPDATE_AUTH_USERNAME, UPDATE_AUTH_MOBILE, UPDATE_AUTH_TYPE, UPDATE_AUTH_WELCOME, REGISTER_PROTOCOL } from '../../actions/actionTypes'
/* import { UpdateUserToken } from '../../actions/user' */

let initialState = {
  mobile: '',
  type: 0,
  protocol: [],
  welcome: true,//新用户欢迎
  username: '',
  wxcode: 0,
  wxstate: '',
  openid: {},
  buyopenid: ''
}
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_AUTH_MOBILE:
      return { ...state, mobile: state.mobile = action.mobile }
    case UPDATE_AUTH_USERNAME:
      return { ...state, username: state.username = action.username }
    case UPDATE_WECHAT_CODE:
      return { ...state, wxcode: state.wxcode = action.wxcode }
    case UPDATE_WECHAT_STATE:
      return { ...state, wxstate: state.wxstate = action.wxstate }
    case UPDATE_AUTH_WELCOME:
      return { ...state, welcome: state.welcome = action.welcome }
    case UPDATE_AUTH_TYPE:
      return { ...state, type: state.type = action.authtype }
    case REGISTER_PROTOCOL:
      return { ...state, protocol: state.protocol = action.protocol }
    case UPDATE_USER_OPENID:
      return { ...state, openid: state.openid = action.openid }
    case UPDATE_USER_BUY_OPENID:
      return { ...state, buyopenid: state.buyopenid = action.buyopenid }
    default:
      return state
  }
}
