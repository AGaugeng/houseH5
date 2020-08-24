import {
    UPDATE_LOG_BALANCE,
    ADD_LOG_BALANCE
} from './actionTypes'
import { FormDataPost } from '../network'
import { LogoutLogin } from './auth'
import Toast from '../tool/toast'
export const UpdateLogBalance = data => ({
    type: UPDATE_LOG_BALANCE,
    data
})
export const addLogBalance = data => ({
    type: ADD_LOG_BALANCE,
    data
})

/* export const UpdateLogBalanceRefreshing = refreshing => ({
    type: UPDATE_LOG_BALANCE_REFRESHING,
    refreshing
})
export const UpdateLogBalanceNoDada = nodata => ({
    type: UPDATE_LOG_BALANCE_NODATA,
    nodata
})
export const UpdateLogBalancePage = page => ({
    type: UPDATE_LOG_BALANCE_PAGE,
    page
})
 */

/**
* 获取消息列表
*/
export const getLogBalance = (data, page, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user, balance } = getState()
        FormDataPost('/api/users/amount_log', data, user.token).then((data) => {
            if (data.code === 0) {
                if (page > 1) {
                    for (let x in data.data) {
                        balance.data.push(data.data[x])
                    }
                } else {
                    dispatch(UpdateLogBalance(data.data))
                }
                actions()
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
