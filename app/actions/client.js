import { fetchPost, FormDataPost } from '../network'
import {
    UPDATE_CLIENT_RENT,
    UPDATE_CLIENT_SELL,
    UPDATE_CLIENT_VIEWLOG,
    UPDATE_CLIENT_INFO,
    UPDATE_VIEW_LOG_DETAILL,
    UPDATE_MY_CLIENT_SELL,
    UPDATE_MY_CLIENT_RENT,
    UPDATE_SEE_LIST
} from './actionTypes'
// import JPushModule from 'jpush-react-native'
import { LogoutLogin } from './auth'
// import { UpdateLogBalance, UpdateLogBalanceRefreshing, UpdateLogBalanceNoDada, UpdateLogBalancePage } from './log'
import Toast from '../tool/toast'
// import Loading from '../tool/loading'

export const UpdateClientSell = selllist => ({
    type: UPDATE_CLIENT_SELL,
    selllist
})
export const UpdateClientRent = rentlist => ({
    type: UPDATE_CLIENT_RENT,
    rentlist
})
export const UpdateMyClientSell = myselllist => ({
    type: UPDATE_MY_CLIENT_SELL,
    myselllist
})
export const UpdateMyClientRent = myrentlist => ({
    type: UPDATE_MY_CLIENT_RENT,
    myrentlist
})

export const UpdateClientViewLog = viewlog => ({
    type: UPDATE_CLIENT_VIEWLOG,
    viewlog
})
export const UpdateClientInfo = clientinfo => ({
    type: UPDATE_CLIENT_INFO,
    clientinfo
})

export const UpdateViewLogDetail = datail => ({
    type: UPDATE_VIEW_LOG_DETAILL,
    datail
})
export const UpdateSeeList = seelist => ({
    type: UPDATE_SEE_LIST,
    seelist
})


/**
 * 客源管理-求购
 */
export const getClientSell = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        let headers = user.token
        // JPushModule.getRegistrationID(registrationId => {
        //     headers['RegistrationId'] = registrationId
        // })
        FormDataPost('/api/client/get_client_list', data, headers).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateClientSell(data.data))
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

            }
        }).catch(code => {

        })
    }
}

/**
 * 客源管理-求租
 */
export const getClientRent = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        let headers = user.token
        // JPushModule.getRegistrationID(registrationId => {
        //     headers['RegistrationId'] = registrationId
        // })
        FormDataPost('/api/client/get_client_list', data, headers).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateClientRent(data.data))
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

            }
        }).catch(code => {

        })
    }
}


/**
 * 我的客源-求购
 */
export const getMyClientSell = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        let headers = user.token
        // JPushModule.getRegistrationID(registrationId => {
        //     headers['RegistrationId'] = registrationId
        // })
        FormDataPost('/api/client/get_me_client_list', data, headers).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateMyClientSell(data.data))
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

            }
        }).catch(code => {

        })
    }
}

/**
 * 我的客源-求租
 */
export const getMyClientRent = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        let headers = user.token
        // JPushModule.getRegistrationID(registrationId => {
        //     headers['RegistrationId'] = registrationId
        // })
        FormDataPost('/api/client/get_me_client_list', data, headers).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateMyClientRent(data.data))
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

            }
        }).catch(code => {

        })
    }
}

/**
 * 新户客源  &修改客户
 */
export const saveClientInfo = (data, action = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/client/save_client_info', data, user.token).then((data) => {
            if (data.code === 0) {
                Toast.success("保存成功!")
                action()
                // dispatch(getClientRent())
                // dispatch(getClientSell())
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else if (data.code === -1) {

                Toast.warning(data.errMsg)
            }
            else {
                Toast.warning("保存失败!")
            }
        }).catch(code => {
            Toast.warning('修改失败')

        })

    }
}

/**
 * 删除客户
 */
export const delClientInfo = (data, action = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/Client/del_client_info', data, user.token).then((data) => {
            if (data.code === 0) {
                Toast.success("删除成功!")
                action()
                // dispatch(getClientRent())
                // dispatch(getClientSell())
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("删除失败!")
            }
        }).catch(code => {
            Toast.warning('修改失败')

        })

    }
}
/**
 * 看房记录
 */
export const getClientViewLog = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/client/get_client_view_log', data, user.token).then((data) => {

            if (data.code === 0) {
                dispatch(UpdateClientViewLog(data.data))
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("参数加载失败!")
            }
        }).catch(code => {
            Toast.warning('修改失败')

        })

    }
}
/**
 * 我的客户 -》 客户信息
 */
export const getClientInfo = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/client/get_client_info', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateClientInfo(data.data))
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("保存失败!")
            }
        }).catch(code => {
            Toast.warning("保存失败!")
        })

    }
}
/**
 * 我的客户 -》 跟客记录  //今天带张小姐看了天紫雅婷小区房源，反馈不错
 */
export const addClientViewLog = (data, navigation = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/client/add_client_view_log', data, user.token).then((data) => {
            if (data.code === 0) {
                Toast.success("保存成功!")
                // dispatch(getClientList())
                // dispatch(getClientRent())
                // dispatch(getClientSell())
                navigation()
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("保存失败!")
            }
        }).catch(code => {
            Toast.warning("保存失败!")
        })

    }
}
/**
 * 我的客户 -》 看房详情
 */
export const getViewLogDetail = (data, navigation = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/client/get_view_log_detail', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateViewLogDetail(data.data))
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("获取失败!")
            }
        }).catch(code => {
            Toast.warning("获取失败!")
        })

    }
}
/**
 * 跟客维护 -》 获取当前用户查看过的房源列表
 */
export const geSeeList = (data, navigation = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/House/get_see_list', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateSeeList(data.data))
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("您未查看过房源!")
            }
        }).catch(code => {
            Toast.warning("获取失败!")
        })

    }
}
