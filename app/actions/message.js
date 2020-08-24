import { UPDATE_MESSAGES_DATA, UPDATE_PUSH_MESSAGES, UPDATE_MESSAGES_CONTENT } from './actionTypes'
/* import {
    connecting, open, closed, message
} from '../../plugin/websocket/actions' */

import { fetchPost, FormDataPost } from '../network'
import { LogoutLogin } from './auth'
import Toast from '../tool/toast'
export const UpdateMessagesData = messages => ({
    type: UPDATE_MESSAGES_DATA,
    messages
})

export const UpdatePushParams = pushmessages => ({
    type: UPDATE_PUSH_MESSAGES,
    pushmessages
})
/**
 * 获取消息内容
 */
export const UpdateMessagesCount = count => ({
    type: UPDATE_MESSAGES_CONTENT,
    count
})

/**
* 获取消息列表
*/
export const getMessagesData = (data, page, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user, message } = getState()
        let count = 0
        FormDataPost('/api/message/get_list', data, user.token).then((data) => {
            if (data.code === 0) {
                if (page > 1) {
                    for (let x in data.data) {
                        message.messages.push(data.data[x])
                    }
                } else {
                    dispatch(UpdateMessagesData(data.data))
                }
                actions()
                message.messages.length > 0 &&
                    message.messages.map((item, index) => {
                        if (item.status === '0') {
                            count++
                        }
                        dispatch(UpdateMessagesCount(count))
                    })

            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("消息加载失败!")
            }
        }).catch(code => {
            Toast.warning("消息加载失败!")
        })
    }
}
/**
* 获取消息内容
*/
export const getMessagesContent = (data, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/message/get_info', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateMessagesCount(data.data))
                actions()
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            }
        }).catch(code => {

        })
    }
}
/**
* 获取推送消息
*/
export const getPushParams = () => {
    return (dispatch, getState) => {
        const { user } = getState()
        fetchPost('/push/getMessage', '', user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdatePushParams(data.data))
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("消息加载失败!")
            }
        }).catch(code => {
            Toast.warning("消息加载失败!")
        })
    }
}

export const pushReaded = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/push/readMessage', data, user.token)
            .then((data) => {
                if (data.code === 0) {
                    dispatch(getPushParams())
                }
                else {
                    // Toast.warning('读取失败')
                }
            }).catch(() => {
                // Toast.warning('读取失败')
            })
    }
}