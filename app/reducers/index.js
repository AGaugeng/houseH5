import { combineReducers } from 'redux'
import auth from './auth'
import nav from './nav'
import counter from './counter'
import user from './user'
import location from './location'
import house from './house'
import message from './message'
import balance from './log/balance'
import client from './client'
import wechat from './wechat'
import edit from './edit'
const AppReducer = combineReducers({
  nav,
  auth,
  counter,
  user,
  location,
  house,
  message,
  balance,
  client,
  wechat,
  edit
});

export default AppReducer; 