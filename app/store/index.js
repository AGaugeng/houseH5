/*
 * @Author: Song
 * @Date: 2018-10-30 21:33:40 
 * @Last Modified by: Song
 * @Last Modified time: 2018-10-31 10:41:41
 */
// 'use strict';

import thunkMiddleware from 'redux-thunk';
import { persistReducer } from 'redux-persist';  //persistCombineReducers
import { createStore, applyMiddleware  } from 'redux';
import reducers from './../reducers/';
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native

const config = {
    key: 'fang.ofan.cn',
    storage,
};

const reducer = persistReducer(config, reducers);
let store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;