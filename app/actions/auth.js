import {
    UPDATE_AUTH_MOBILE,
    UPDATE_AUTH_TYPE,
    LOGIN,
    LOGOUT,
    REGISTER,
    UPDATE_USER_TOKEN,
    DELETE_USER_TOKEN,
    REGISTER_PROTOCOL,
    UPDATE_AUTH_USERNAME,
    UPDATE_WECHAT_CODE,
    UPDATE_WECHAT_STATE,
    WX_REGISTER,
    WX_BIND,
    OLD_LOGIN,
    UPDATE_USER_OPENID,
    UPDATE_USER_BUY_OPENID

} from './actionTypes'
// import * as WeChat from './WeChat'
// import Loading from '../tool/loading'
import { isPhoneNumber } from '../tool/verify'
import { fetchPost, FormDataPost } from '../network'
import Toast from '../tool/toast'
import { weixinLogin } from './wechat'
export const UpdateAuthMobile = mobile => ({
    type: UPDATE_AUTH_MOBILE,
    mobile
})
export const UpdateAuthUsername = username => ({
    type: UPDATE_AUTH_USERNAME,
    username
})

export const UpdateAuthType = authtype => ({
    type: UPDATE_AUTH_TYPE,
    authtype
})

export const UpdateWechatCode = wxcode => ({
    type: UPDATE_WECHAT_CODE,
    wxcode
})

export const UpdateWechatState = wxstate => ({
    type: UPDATE_WECHAT_STATE,
    wxstate
})

/**
 * 登录
 */
export const Login = () => ({
    type: LOGIN
})
/**
 * 退出登录
 */
export const Logout = () => ({
    type: LOGOUT
})
/**
 * 微信注册
 */
export const WxRegister = () => ({
    type: WX_REGISTER
})

/**
 * 微信绑定
 */
export const WxBind = () => ({
    type: WX_BIND
})
/**
 * 微信绑定
 */
export const OldLogin = () => ({
    type: OLD_LOGIN
})


/**
 * 注册
 */
export const Register = () => ({
    type: REGISTER
})
/**
 * 退出登录
 */
export const LogoutLogin = () => {
    return (dispatch, getState) => {
        // dispatch(DeleteUserToken())
        dispatch(Logout())
    }
}

/**
 * 写入openID
 * @param {*} openid
 */
export const UpdateUserOpenId = openid => ({
    type: UPDATE_USER_OPENID,
    openid
})

export const UpdateUserBuyOpenId = buyopenid => ({
    type: UPDATE_USER_BUY_OPENID,
    buyopenid
})

/**
 * 写入token
 * @param {*} token 
 */
export const UpdateUserToken = token => ({
    type: UPDATE_USER_TOKEN,
    token
})
/**
 * 删除删了删除 token
 * @param {*} token 
 */
export const DeleteUserToken = () => ({
    type: DELETE_USER_TOKEN
})
//注册协议
export const RegisterProtocol = (protocol) => ({
    type: REGISTER_PROTOCOL,
    protocol
})


//获取验证码登录
export const GetVerificationCodeLogin = (mobile, shouldStartCounting) => {
    return (dispatch, getState) => {
        const { auth } = getState()
        if (!mobile || !isPhoneNumber(mobile)) {
            Toast.warning("请输入登录手机号!")
        } else {
            FormDataPost('/api/login/get_captcha', [{ name: 'mobile', data: mobile }]).then((data) => {
                if (data.code === 0) {
                    Toast.success("验证码发送成功!")
                    shouldStartCounting && shouldStartCounting(true)
                } else if (data.code === -1) {
                    shouldStartCounting(false)
                    Toast.warning("手机号不正确!")
                } else if (data.code === -4) {
                    shouldStartCounting(false)
                    Toast.warning("操作过于频繁!")
                }
                else {
                    shouldStartCounting(false)
                    Toast.warning("验证码发送失败!")
                }
            }).catch(() => {
                // Loading.hide()
                shouldStartCounting(false)
                Toast.warning("验证码发送失败!")
            })
        }
    }
}
//获取验证码注册
export const GetVerificationCodeReg = (mobile, navigate) => {
    return (dispatch, getState) => {
        if (!mobile || !isPhoneNumber(mobile)) {
            Toast.warning("请输入登录手机号!")
        } else {
            fetchPost('/api/login/reguser', { mobile, type: 1 }).then((data) => {
                if (data.code === 0) {
                    navigate()
                } else if (data.code === -1) {
                    Toast.warning("注册失败!")
                } else if (data.code === -2) {
                    Toast.warning("手机号码不正确!")
                } else if (data.code === -3) {
                    Toast.warning("手机号码已存在!")
                } else if (data.code === -4) {
                    Toast.warning("请输入6-12位的密码!")
                } else if (data.code === -9) {
                    Toast.warning("验证码不正确!")
                } else {
                    Toast.warning("注册失败!")
                }
            }).catch(() => {
                // Loading.hide()
                Toast.warning("注册失败!")
            })
        }
    }
}


//登录验证
export const AuthSubmitLogin = (password, captcha, actions = () => { }) => {
    return (dispatch, getState) => {
        const { auth } = getState()
        if (!auth.mobile || !isPhoneNumber(auth.mobile)) {
            actions()
            Toast.warning("请输入登录手机号!")
        } else if (auth.type === 0 && !password) {
            actions()
            Toast.warning("请输入登录密码!")
        } else if (auth.type === 1 && !captcha) {
            actions()
            Toast.warning("请填写验证码!")
        } else {
            // Loading.show()
            let data = [
                { name: 'captcha', data: captcha },
                { name: 'mobile', data: auth.mobile },
                { name: 'password', data: password },
                { name: 'type', data: auth.type },
            ]
            FormDataPost('/api/login/login', data).then((data) => {
                // Loading.hide()
                actions()
                if (data.code === 0) {
                    dispatch(UpdateUserToken(data.data))
                    dispatch(Login())
                } else if (data.code === -1) {
                    Toast.warning("手机号或密码不正确!")
                } else if (data.code === -2) {
                    Toast.warning("用户不存在!")
                } else if (data.code === -3) {
                    Toast.warning("用户被禁用!")
                } else if (data.code === -4) {
                    Toast.warning("验证码不正确!")
                } else {
                    Toast.warning("登录失败!")
                }
            }).catch(() => {
                // Loading.hide()
                Toast.warning("登录失败!")
            })

        }
    }
}
//注册账号
export const RegisterAccount = (password, confirmpassword, captcha) => {
    return (dispatch, getState) => {
        const { auth } = getState()
        if (!auth.mobile || !isPhoneNumber(auth.mobile)) {
            Toast.warning("请输入登录手机号!")
        } else if (!captcha) {
            Toast.warning("请填写验证码!")
        } else if (!password) {
            Toast.warning("请填写登录密码!")
        } else if (password !== confirmpassword) {
            Toast.warning("确认密码不正确!")
        } else {
            // Loading.show()
            let data = [
                { name: 'captcha', data: captcha },
                { name: 'mobile', data: auth.mobile },
                { name: 'password', data: password },
            ]
            FormDataPost('/api/login/reguser', data).then((data) => {
                // Loading.hide()
                if (data.code === 0) {
                    dispatch(UpdateUserToken(data.data))
                    dispatch(Login())
                } else if (data.code === -1) {
                    Toast.warning("注册失败!")
                } else if (data.code === -4) {
                    Toast.warning("请输入6-12位的密码!")
                } else if (data.code === -3) {
                    Toast.warning("手机号码已存在!")
                } else if (data.code === -9) {
                    Toast.warning("验证码不正确!")
                } else if (data.code === -2) {
                    Toast.warning("手机号码不正确!")
                } else {
                    Toast.warning("注册失败!")
                }
            }).catch(() => {
                // Loading.hide()
                Toast.warning("注册失败!")
            })

        }
    }
}

//微信注册账号
export const WxRegisterAccount = (password, confirmpassword, captcha, recommend_code) => {
    return (dispatch, getState) => {

        const { auth } = getState()
        if (!auth.mobile || !isPhoneNumber(auth.mobile)) {
            Toast.warning("请输入登录手机号!")
        } else if (!captcha) {
            Toast.warning("请填写验证码!")
        } else if (!password) {
            Toast.warning("请填写登录密码!")
        } else if (!auth.openid.openid) {
            Toast.warning("获取失败!")
        } else if (!auth.openid.access_token) {
            Toast.warning("获取失败!")
        } else if (password !== confirmpassword) {
            Toast.warning("确认密码不正确!")
        } else {
            // Loading.show()
            let data = [
                { name: 'captcha', data: captcha },
                { name: 'mobile', data: auth.mobile },
                { name: 'password', data: password },
                { name: 'openid', data: auth.openid.openid },
                { name: 'access_token', data: auth.openid.access_token },
                { name: 'recommend_code', data: recommend_code },
            ]


            FormDataPost('/api/weixin/wx_reg', data).then((data) => {
                // Loading.hide()
                if (data.code === 0) {
                    dispatch(UpdateUserToken(data.data))
                    dispatch(UpdateUserBuyOpenId(auth.openid.openid))
                    dispatch(Login())
                } else if (data.code === -1) {
                    Toast.warning("注册失败!")
                } else if (data.code === -2) {
                    Toast.warning("手机号码不正确!")
                } else if (data.code === -3) {
                    Toast.warning("手机号码已存在!")
                } else if (data.code === -9) {
                    Toast.warning("验证码不正确!")
                } else if (data.code === -10) {
                    Toast.warning("微信用户已存在!")
                } else {
                    Toast.warning("注册失败!")
                }
            }).catch(() => {

            })

        }
    }
}
/**
 * 登录-找回密码
 */
export const resetPassword = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/login/reset_password', data, user.token).then((data) => {
            if (data.code === 0) {
                Toast.success("重置成功!")
                dispatch(LogoutLogin())
            } else if (data.code === -2) {

                Toast.warning("手机号码不存在!")
            } else if (data.code === -3) {

                Toast.warning("验证码错误!")
            } else if (data.code === -4) {

                Toast.warning("密码超度必须超过6位!")
            } else {
                Toast.warning("重置失败!")
            }
        }).catch(code => {
            Toast.warning("重置失败!")
        })

    }
}


//获取注册协议
export const getRegisterProtocol = navigate => {
    return (dispatch, getState) => {
        // Loading.show()
        fetchPost('/authorized/reg/protocol').then((data) => {
            // Loading.hide()
            if (data.code === 0) {
                dispatch(RegisterProtocol(data.data))
            } else {
                navigate()
            }
        }).catch(code => {
            // Loading.hide()
            Toast.warning("注册协议加载失败!")
            navigate()
        })

    }
}


//微信验证
export const WeChatLogin = (data) => {
    return (dispatch, getState) => {
        // Loading.show()
        weixinLogin(data)
            .then((data) => {
                // Loading.hide()
                dispatch(UpdateUserToken(data))
                dispatch(UpdateUserBuyOpenId(data.openid))
                dispatch(Login())
            }).catch((data) => {
                // Loading.hide()
                if (data.code === -1) {
                    Toast.warning("欢迎登陆!")
                    dispatch(OldLogin())
                    // dispatch(WxBind())
                } else if (data.code === -2) {
                    Toast.warning("未注册,请先注册!")

                    dispatch(UpdateUserOpenId(data.data))
                    dispatch(WxRegister())

                } else if (data.code === -3) {
                    Toast.warning("授权失败!")
                } else {
                    Toast.warning("自动登录失败!")
                }
            })
    }
}