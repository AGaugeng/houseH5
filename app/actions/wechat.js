

/* import RNFetchBlob from 'rn-fetch-blob' */
import { FormDataPost, Config } from '../network'
import { getUserInfo, LogoutLogin } from './user'
import { isPhoneNumber } from '../tool/verify'
import {
    UPDATE_BINDING_WEIXIN,
    UPDATE_WX_LOAD
} from './actionTypes'
// WeChat.registerApp(Config.WECHAT_APPID)
import Toast from '../tool/toast'
import { UpdateUserToken, Login } from './auth'

export const UpdateBindingWeixin = binding => ({
    type: UPDATE_BINDING_WEIXIN,
    binding
})

export const UpdateWxLoad = wxload => ({
    type: UPDATE_WX_LOAD,
    wxload
})
/**
 * 购买会员
 * @param {*} data 
 */

export const getPaySign = (data, type, action = () => { }, reject = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/vip/create_order', data, user.token)
            .then((data) => {
                if (data.code === 0) {
                    if (type === 1) {
                        Toast.success("购买成功!")
                        dispatch(getUserInfo())
                        action()
                    } else if (type === 3) {
                        // 支付宝支付
                        let order = data.data.signature
                        console.log('----- 请求订单成功 -----');
                        window.checkServices(window.pays['alipay']);
                        window.plus.payment.request(window.pays['alipay'], order, function (result) {

                            // console.log(JSON.stringify(result));
                            Toast.success("购买成功!")
                            dispatch(getUserInfo())
                            action()
                        }, function (e) {
                            Toast.warning("购买失败!")

                            console.log('[' + e.code + ']：' + e.message);

                        });



                    } else {
                        if (typeof plus === 'object') {
                            // 微信支付
                            let order = data.data.signature
                            console.log('----- 请求订单成功 -----');
                            window.checkServices(window.pays['wxpay']);
                            window.plus.payment.request(window.pays['wxpay'], order, function (result) {

                                // console.log(JSON.stringify(result));
                                Toast.success("购买成功!")
                                dispatch(getUserInfo())
                                action()
                            }, function (e) {
                                Toast.warning("购买失败!")
                                console.log('[' + e.code + ']：' + e.message);

                            });
                        } else {

                            let signature = data.data.signature
                            window.WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', signature,
                                function (res) {
                                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                                        // 使用以上方式判断前端返回,微信团队郑重提示：
                                        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                        Toast.success("购买成功!")
                                        dispatch(getUserInfo())
                                        action()
                                    }
                                });
                        }

                    }

                } else if (data.code === -300) {
                   
                    if (user.islogin) { 
                        Toast.warning("登录超时!")
                        dispatch(LogoutLogin())
                    }
                } else if (data.code === -1) {
                    Toast.warning("购买失败!")
                    reject()
                } else if (data.code === -5) {
                    Toast.warning("用户ID出错!")
                    reject()
                } else if (data.code === -6) {
                    Toast.warning("支付方式选择错误!")
                    reject()
                } else if (data.code === -7) {
                    Toast.warning("请选择够买的会员类型!")
                    reject()
                } else if (data.code === -20) {
                    Toast.warning("余额不足!")
                    reject()
                } else if (data.code === -10) {
                    Toast.warning("当前用户不是微信用户!")
                } else if (data.code === -11) {
                    Toast.warning("生成签名时发生错误!")
                    reject()
                } else if (data.code === -21) {
                    Toast.warning("支付密码不正确!")
                    reject()
                } else {
                    Toast.warning("失败!")
                }
                reject()
            }).catch(() => {

                Toast.warning("失败!")
                reject()
            })


    }
}
/**
 * 购买查看房源次数
 * @param {*} data 
 */

export const getDetailPay = (data, type, action = () => { }, reject = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/House/house_detail_pay', data, user.token)
            .then((data) => {
                if (data.code === 0) {
                    if (type === 1) {
                        Toast.success("购买成功!")
                        dispatch(getUserInfo())
                        action()
                    } else if (type === 3) {
                        // 支付宝支付
                        let order = data.data.signature
                        console.log('----- 请求订单成功 -----');
                        window.checkServices(window.pays['alipay']);
                        window.plus.payment.request(window.pays['alipay'], order, function (result) {
                            console.log('----- 支付成功 -----');
                            // console.log(JSON.stringify(result));
                            Toast.success("购买成功!")
                            dispatch(getUserInfo())
                            action()

                        }, function (e) {
                            Toast.warning("购买失败!")
                            console.log('[' + e.code + ']：' + e.message);

                        });



                    }
                    else {
                        if (typeof plus === 'object') {
                            // 微信支付
                            let order = data.data.signature
                            console.log('----- 请求订单成功 -----');
                            window.checkServices(window.pays['wxpay']);
                            window.plus.payment.request(window.pays['wxpay'], order, function (result) {

                                // console.log(JSON.stringify(result));
                                Toast.success("购买成功!")
                                dispatch(getUserInfo())
                                action()
                            }, function (e) {
                                Toast.warning("购买失败!")

                                console.log('[' + e.code + ']：' + e.message);

                            });
                        } else {
                            let signature = data.data.signature
                            window.WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', signature,
                                function (res) {
                                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                                        // 使用以上方式判断前端返回,微信团队郑重提示：
                                        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                        Toast.success("购买成功!")
                                        dispatch(getUserInfo())
                                        action()
                                    }
                                });
                        }
                    }
                } else if (data.code === -300) {
                   
                    if (user.islogin) {
                        Toast.warning("登录超时!")
                        dispatch(LogoutLogin())
                    }
                } else if (data.code === -1) {
                    Toast.warning("购买失败!")
                    reject()
                } else if (data.code === -5) {
                    Toast.warning("用户ID出错!")
                    reject()
                } else if (data.code === -6) {
                    Toast.warning("支付方式选择错误!")
                    reject()
                } else if (data.code === -7) {
                    Toast.warning("请选择够买的会员类型!")
                    reject()
                } else if (data.code === -20) {
                    Toast.warning("余额不足!")
                    reject()
                } else if (data.code === -10) {
                    Toast.warning("当前用户不是微信用户!")
                    reject()
                } else if (data.code === -11) {
                    Toast.warning("生成签名时发生错误!")
                    reject()
                } else if (data.code === -21) {
                    Toast.warning("支付密码不正确!")
                    reject()
                } else if (data.code === -30) {
                    Toast.warning("已经查看过该房源!")
                    reject()
                } else {
                    Toast.warning("失败!")
                    reject()
                }
            }).catch(() => {

                Toast.warning("失败!")
                reject()
            })


    }
}
/**
 * 分享
 * @param {*} data 
 */
export const get_url = () => {


    if (document.URL.indexOf("#") === -1) {
        return encodeURIComponent(document.URL)
    } else {
        return encodeURIComponent(document.URL.substr(0, document.URL.indexOf("#")))
    }
}
export const wxShare = () => {
    return (dispatch, getState) => {
        const { user } = getState()
        const url = Config.API_URL + '/api/Public/get_jsapi_signature?token='
            + user.token.token + '.' + user.token.uid + '&url=' + get_url()

        fetch(url, {
            method: 'GET',
        }).then(function (response) {
            // The response is a Response instance.
            // You parse the data into a useable format using `.json()`
            return response.json()
        }).then(function (data) {
            // `data` is the parsed version of the JSON returned from the above endpoint.
            // console.log(data) // { "userId": 1, "id": 1, "title": "...", "body": "..." }
            if (data.code === 0) {

                let signature = data.data
                signature.jsApiList =
                    ['onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'chooseWXPay',
                        'scanQRCode',]
                signature.debug = false
                window.wx.config(signature);
                window.wx.ready(function () {
                    // isWxLoad = !isWxLoad
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    // console.log(isWxLoad)
                    window.wx.onMenuShareAppMessage({
                        title: '房长官', // 分享标题
                        desc: '您身边的房源共享平台', // 分享描述
                        link: Config.API_URL + '/api/weixin/index?state=' + user.recommendcode.code, // 分享链接，该链接域名必须与当前企业的可信域名一致
                        imgUrl: Config.API_URL + '/image/logo_fzg.png', // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            Toast.success( "分享成功!")
                        },
                        cancel: function () {
                            Toast.warning("取消分享!")
                        }
                    })
                    window.wx.onMenuShareTimeline({
                        title: '房长官', // 分享标题
                        desc: '您身边的房源共享平台', // 分享描述
                        link: Config.API_URL + '/api/weixin/index?state=' + user.recommendcode.code, // 分享链接，该链接域名必须与当前企业的可信域名一致
                        imgUrl: Config.API_URL + '/image/logo_fzg.png', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            Toast.success("分享成功!")
                        },
                        cancel: function () {
                            Toast.warning("取消分享!")
                        }
                    });
                    window.wx.onMenuShareQQ({
                        title: '房长官', // 分享标题
                        desc: '您身边的房源共享平台', // 分享描述
                        link: Config.API_URL + '/api/weixin/index?state=' + user.recommendcode.code, // 分享链接，该链接域名必须与当前企业的可信域名一致
                        imgUrl: Config.API_URL + '/image/logo_fzg.png', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            Toast.success("分享成功!")
                        },
                        cancel: function () {
                            Toast.warning("取消分享!")
                        }
                    });
                    dispatch(UpdateWxLoad(true))
                });
            } else if (data.code === -300) {
               
                if (user.islogin) { 
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("失败!")
            }
        }).catch((error) => {
            console.log(error)
        })
    }
}
// export const shareFriend = () => {
//     return (dispatch, getState) => {
//         const { wechat, user } = getState()
//         // console.log(wechat.wxload)
//         // if (isWxLoad) {
//         // console.log(user.recommendcode.code)

//     }
//     //     } else {
//     //         Toast.warning({
//     //             text: "正在加载...!",
//     //             
//     //             
//     //             
//     //         })
//     //     }
//     // }

// }

// export const shareTimeline = () => {
//     return (dispatch, getState) => {
//         const { wechat, user } = getState()
//         // if (isWxLoad) {
//         // console.log(user.recommendcode.code)
//         window.wx.onMenuShareTimeline({
//             title: '房长官', // 分享标题
//             desc: '您身边的房源共享平台', // 分享描述
//             link: Config.API_URL + '/api/weixin/index?status=' + user.recommendcode.code, // 分享链接，该链接域名必须与当前企业的可信域名一致
//             imgUrl: Config.API_URL + '/image/logo_fzg.png', // 分享图标
//             success: function () {
//                 // 用户确认分享后执行的回调函数
//                 Toast.warning({
//                     text: "分享成功!",
//                     
//                     
//                     
//                 })
//             },
//             cancel: function () {
//                 Toast.warning({
//                     text: "取消分享!",
//                     
//                     
//                     
//                 })
//             }
//         });
//     }
// else {
//     Toast.warning({
//         text: "正在加载...!",
//         
//         
//         
//     })
// }

// }

// }

// export const shareQQ = () => {
//     return (dispatch, getState) => {
//         const { wechat, user } = getState()
//         // if (isWxLoad) {
//         // console.log(user.recommendcode.code)
//         window.wx.onMenuShareQQ({
//             title: '房长官', // 分享标题
//             desc: '您身边的房源共享平台', // 分享描述
//             link: Config.API_URL + '/api/weixin/index?status=' + user.recommendcode.code, // 分享链接，该链接域名必须与当前企业的可信域名一致
//             imgUrl: Config.API_URL + '/image/logo_fzg.png', // 分享图标
//             success: function () {
//                 // 用户确认分享后执行的回调函数
//                 Toast.warning({
//                     text: "分享成功!",
//                     
//                     
//                     
//                 })
//             },
//             cancel: function () {
//                 Toast.warning({
//                     text: "取消分享!",
//                     
//                     
//                     
//                 })
//             }
//         });
//     }
//     else {
//         Toast.warning({
//             text: "正在加载...!",
//             
//             
//             
//         })
//     }

// }


// }


/**
* 微信登录
*/
export const weixinLogin = (data) => {
    return new Promise((fulfill, reject) => {
        FormDataPost('/api/weixin/code_login', data).then((data) => {
            if (data.code === 0) {
                fulfill(data.data)
            } else {

                reject(data)
            }
        }).catch(() => {
            reject()
        })

    })
}


/**
     * 绑定微信
     */
export const WxBindAccount = (password, captcha) => {
    return (dispatch, getState) => {
        const { auth } = getState()
        if (!auth.mobile || !isPhoneNumber(auth.mobile)) {
            Toast.warning("请输入手机号码!")
        } else if (auth.type === 0 && !password) {
            Toast.warning("请输入登录密码!")
        } else if (auth.type === 1 && !captcha) {
            Toast.warning("请填写验证码!")
        } else {
            let data = [
                { name: 'captcha', data: captcha },
                { name: 'mobile', data: auth.mobile },
                { name: 'password', data: password },
                { name: 'type', data: auth.type },
                { name: 'openid', data: auth.openid.openid },
            ]
            FormDataPost('/api/weixin/wx_bind', data).then((data) => {
                if (data.code === 0) {
                    dispatch(UpdateUserToken(data.data))
                    dispatch(Login())
                } else if (data.code === -1) {
                    // Toast.warning('手机号或密码不正确')
                    Toast.warning("手机号或密码不正确!")
                } else if (data.code === -2) {
                    Toast.warning("用户不存在!")
                } else if (data.code === -3) {
                    Toast.warning("用户被禁用!")
                } else if (data.code === -4) {
                    Toast.warning("验证码不正确!")
                } else {
                    Toast.warning("绑定失败!")
                }
            }).catch(() => {
                Toast.warning("绑定失败!")
            })

        }
    }
}
