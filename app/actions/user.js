import { fetchPost, FormDataPost } from '../network'
import {
    UPDATE_USER_INFORMATION,
    UPDATE_CREATE_RECOMMEND_CODE,
    UPDATE_RECOMMEND_CODE,
    UPDATE_USER_AVATAR,
    UPDATE_RESOLD_COLLECTION,
    UPDATE_NEW_COLLECTION,
    UPDATE_RENTAL_COLLECTION,
    UPDATE_USER_LEVEL,
    UPDATE_SHARE_LIST,
    UPDATE_HOUSE_MANAGE,
    UPDATE_HOUSE_PENDING,
    UPDATE_HOUSE_RELEASED,
    UPDATE_HOUSE_TRADED,
    UPDATE_LOGIN_STATE,
    UPDATE_USER_ARTICLE,
    UPDATE_RTICLE_DETAIL,
    UPDATE_CAROUSEL_LIST,
    UPDATE_MEMBER_INFO
} from './actionTypes'

import { LogoutLogin } from './auth'
import Toast from '../tool/toast'


export const UpdateUserInfo = info => ({
    type: UPDATE_USER_INFORMATION,
    info
})
export const UpdateUserLevel = level => ({
    type: UPDATE_USER_LEVEL,
    level
})
export const UpdateCreateRecommendCode = createcode => ({
    type: UPDATE_CREATE_RECOMMEND_CODE,
    createcode
})
export const UpdateRecommendCode = recommendcode => ({
    type: UPDATE_RECOMMEND_CODE,
    recommendcode
})

export const UpdateResoldCollection = resoldcollect => ({
    type: UPDATE_RESOLD_COLLECTION,
    resoldcollect
})
export const UpdateNewCollection = newcollect => ({
    type: UPDATE_NEW_COLLECTION,
    newcollect
})
export const UpdateRentalCollection = rentalcollect => ({
    type: UPDATE_RENTAL_COLLECTION,
    rentalcollect
})
export const UpdateUserAvatar = avatar => ({
    type: UPDATE_USER_AVATAR,
    avatar
})

export const UpdateShareList = sharelist => ({
    type: UPDATE_SHARE_LIST,
    sharelist
})

export const UpdateHouseManage = all => ({
    type: UPDATE_HOUSE_MANAGE,
    all
})

export const UpdateHousePenging = pending => ({
    type: UPDATE_HOUSE_PENDING,
    pending
})
export const UpdateHouseReleased = release => ({
    type: UPDATE_HOUSE_RELEASED,
    release
})
export const UpdateHouseTraded = traded => ({
    type: UPDATE_HOUSE_TRADED,
    traded
})

export const UpdateLoginState = islogin => ({
    type: UPDATE_LOGIN_STATE,
    islogin
})
export const UpdateUserArticle = article => ({
    type: UPDATE_USER_ARTICLE,
    article
})

export const UpdateArticleDetail = articledetail => ({
    type: UPDATE_RTICLE_DETAIL,
    articledetail
})
export const UpdateCarouselList = carousel => ({
    type: UPDATE_CAROUSEL_LIST,
    carousel
})


export const UpdateMemberInfo = memberinfo => ({
    type: UPDATE_MEMBER_INFO,
    memberinfo
})


export const getUserInfo = () => {
    return (dispatch, getState) => {
        const { user } = getState()
        let headers = user.token
        // JPushModule.getRegistrationID(registrationId => {
        //     headers['RegistrationId'] = registrationId
        // })
        fetchPost('/api/users/get_users_info', '', headers).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateUserInfo(data.data))
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
 * 会员中心
 */
export const getUserLevel = () => {
    return (dispatch, getState) => {
        const { user } = getState()
        let headers = user.token
        // JPushModule.getRegistrationID(registrationId => {
        //     headers['RegistrationId'] = registrationId
        // })
        fetchPost('/api/users/get_users_level', '', headers).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateUserLevel(data.data))
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
 * 会员资料保存
 */
export const saveMemberInfo = (data, action = () => { }, reject = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/users/save_member_info', data, user.token).then((data) => {
            if (data.code === 0) {
                Toast.success("保存成功!")
                dispatch(getUserInfo())
                action()
            } else if (data.code === -1) {
                Toast.warning(data.errMsg)
                reject()
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else if (data.code === -3) {
                Toast.warning("您还未上传身份证或银行卡!")
                reject()
            } else {
                Toast.warning("保存失败!")
                reject()
            }
        }).catch(code => {
            Toast.warning("保存失败!")
            reject()
        })

    }
}

/**
 * 添加收藏
 */
export const addMyCollection = (data, action = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/users/add_my_collection', data, user.token).then((data) => {
            if (data.code === 0) {

                Toast.success("收藏成功!")
                action()
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            }
            else if (data.code === -100) {

                Toast.warning("收藏失败!")
            }
            else {

                Toast.warning("保存失败!")
            }
        }).catch(code => {

            Toast.warning("保存失败!")
        })

    }
}
/**
 * 取消收藏
 */
export const removeMyCollection = (data, action = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/users/remove_my_collection', data, user.token).then((data) => {
            if (data.code === 0) {

                Toast.success("取消成功!")
                action()
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            }
            else if (data.code === -100) {

                Toast.warning("收藏失败!")
            }
            else {

                Toast.warning("保存失败!")
            }
        }).catch(code => {
            Toast.warning("保存失败!")
        })

    }
}
/**
 * 我的收藏-二手房
 */
export const getResoldCollection = (data, page, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/users/get_my_collection', data, user.token).then((data) => {
            if (data.code === 0) {
                if (page > 1) {
                    for (let x in data.data) {
                        user.resoldcollect.push(data.data[x])
                    }
                    dispatch(UpdateResoldCollection(user.resoldcollect))
                } else {
                    dispatch(UpdateResoldCollection(data.data))
                }
                actions()
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

                Toast.warning("获取失败!")
                actions()
            }
        }).catch(code => {

            Toast.warning("获取失败!")
            actions()
        })

    }
}
/**
 * 我的收藏-新房
 */
export const getNewCollection = (data, page, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/users/get_my_collection', data, user.token).then((data) => {
            if (data.code === 0) {
                if (page > 1) {
                    for (let x in data.data) {
                        user.newcollect.push(data.data[x])
                    }
                    dispatch(UpdateNewCollection(user.newcollect))
                } else {
                    dispatch(UpdateNewCollection(data.data))
                }
                actions()

            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

                Toast.warning("保存失败!")
                actions()
            }
        }).catch(code => {

            Toast.warning("保存失败!")
            actions()
        })

    }
}
/**
 * 我的收藏-租房
 */
export const getRentalCollection = (data, page, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/users/get_my_collection', data, user.token).then((data) => {
            if (data.code === 0) {
                if (page > 1) {
                    for (let x in data.data) {
                        user.rentalcollect.push(data.data[x])
                    }
                    dispatch(UpdateRentalCollection(user.rentalcollect))
                } else {
                    dispatch(UpdateRentalCollection(data.data))
                }
                actions()
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

                Toast.warning("保存失败!")
                actions()
            }
        }).catch(code => {

            Toast.warning("保存失败!")
            actions()
        })

    }
}
/**
 * 设置-意见反馈
 */
export const addOpinion = (data, navigation = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/users/add_opinion', data, user.token).then((data) => {
            if (data.code === 0) {

                Toast.success("提交成功!")
                navigation()
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

                Toast.warning("提交失败!")
            }
        }).catch(code => {

            Toast.warning("提交失败!")
        })

    }
}
/**
 * 设置-个人资料
 */
export const saveUserInfo = (data, callback = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/users/save_user_info', data, user.token).then((data) => {
            if (data.code === 0) {

                Toast.success("修改成功!")
                dispatch(getUserInfo())
                callback()
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

                Toast.warning("修改失败!")
            }
        }).catch(code => {

            Toast.warning("修改失败!")
        })

    }
}
/**
 * 设置-获取个人资料
 */
export const getMemberInfo = () => {
    return (dispatch, getState) => {
        const { user } = getState()

        FormDataPost('/api/users/get_member_info', '', user.token).then((data) => {

            if (data.code === 0) {
                dispatch(UpdateMemberInfo(data.data))
            } else if (data.code === -300) {

                if (user.islogin) {

                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

                Toast.warning("修改失败!")
            }
        }).catch(code => {

            Toast.warning("修改失败!")
        })

    }
}
/**
 * 设置-修改密码
 */
export const vcodeChangePwd = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/users/vcode_change_pwd', data, user.token).then((data) => {

            if (data.code === 0) {

                Toast.success("修改成功!")
                dispatch(getUserInfo())
                if (user.islogin) { dispatch(LogoutLogin()) }
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

                Toast.warning("修改失败!")
            }
        }).catch(code => {

            Toast.warning("修改失败!")
        })

    }
}
/**
 * 设置-修改手机号码
 */
export const modifyMobile = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()

        FormDataPost('/api/users/modify_mobile', data, user.token).then((data) => {

            if (data.code === 0) {

                Toast.success("修改成功!")
                dispatch(getUserInfo())
                if (user.islogin) { dispatch(LogoutLogin()) }
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else if (data.code === -2) {

                Toast.warning("手机号码已存在!")
            } else if (data.code === -3) {

                Toast.warning("验证码不正确!")
            } else {

                Toast.warning("修改失败!")
            }
        }).catch(code => {
            Toast.warning("修改失败!")
        })

    }
}
/**
 * 设置-支付密码
 */
export const ChangePayPwd = (data, navigation = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/Users/edit_password', data, user.token).then((data) => {

            if (data.code === 0) {

                if (!!user.info.pay_password) {
                    Toast.success("修改成功!")
                } else {
                    Toast.success("设置成功!")
                }
                dispatch(getUserInfo())
                navigation()
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else if (data.code === -3) {

                Toast.warning("旧密码不正确!")
            } else if (data.code === -4) {

                Toast.warning("密码不合格!")
            } else if (data.code === -1) {

                Toast.warning("设置失败!")
            } else if (data.code === -5) {
                Toast.warning("验证码不正确!")
            } else {
                Toast.warning("修改失败!")
            }
        }).catch(code => {
            Toast.warning("修改失败!")
        })

    }
}
/**
 * 设置-查看是否已有支付密码
 */
export const getChangePayPwd = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/Users/exist_pay_password', data, user.token).then((data) => {
            if (data.code === 0) {

                Toast.success("修改成功!")
                // dispatch(UpdateRentalCollection(data.data))
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("修改失败!")
            }
        }).catch(code => {
            Toast.warning("修改失败!")
        })

    }
}


/**
 * 获取推荐列表
 */
export const getShareList = () => {
    return (dispatch, getState) => {
        const { user } = getState()

        fetchPost('/api/recommend/get_my_recommend', '', user.token).then((data) => {
            // console.log(data)
            if (data.code === 0) {

                dispatch(UpdateShareList(data.data))
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

                Toast.warning("获取参数失败!")
            }
        }).catch(code => {

            Toast.warning("获取参数失败!")
        })

    }
}
/**
 * 创建推荐码
 */
export const createRecommendCode = () => {
    return (dispatch, getState) => {
        const { user } = getState()
        fetchPost('/api/recommend/create_recommend_code', '', user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateCreateRecommendCode(data.data))
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("创建失败!")
            }
        }).catch(code => {
            Toast.warning("创建失败!")
        })

    }
}

/**
 * 使用推荐码
 */
export const useRecommendCode = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/recommend/use_recommend_code', data, user.token).then((data) => {
            if (data.code === 0) {
                Toast.success("您已使用推荐码!")
                dispatch(getUserInfo())
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

                Toast.warning("修改失败!")
            }
        }).catch(code => {

            Toast.warning("修改失败!")
        })

    }
}

/**
  *  获取此账号邀请码
 */
export const getRecommendCode = () => {
    return (dispatch, getState) => {
        const { user } = getState()
        fetchPost('/api/recommend/get_recommend_code', '', user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateRecommendCode(data.data))
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
 * 修改头像
 */
export const modifyAvatar = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()


        FormDataPost('/user/modifyAvatar', [{ name: 'image', data: { uri: data.uri, type: 'image/jpg', name: 'image' } }], user.token).then((data) => {

            if (data.code === 0) {

                Toast.success("修改成功!")
                dispatch(UpdateUserAvatar(data.data))
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

                Toast.warning("修改失败!")
            }
        }).catch(code => {

            Toast.warning("修改失败!")
        })

    }
}



/**
 * 房源管理-全部
 */
export const getHouseManage = (data, type, page, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()

        FormDataPost('/api/House/hourse_list', data, user.token).then((data) => {
            if (data.code === 0) {
                if (type === 1) {
                    if (page > 1) {
                        for (let x in data.data) {
                            user.all.push(data.data[x])
                        }
                        dispatch(UpdateHouseManage(user.all))
                    } else {
                        dispatch(UpdateHouseManage(data.data))
                    }
                } else if (type === 2) {
                    if (page > 1) {
                        for (let x in data.data) {
                            user.pending.push(data.data[x])
                        }
                        dispatch(UpdateHousePenging(user.pending))
                    } else {
                        dispatch(UpdateHousePenging(data.data))
                    }
                }
                else if (type === 3) {
                    if (page > 1) {
                        for (let x in data.data) {
                            user.release.push(data.data[x])
                        }
                        dispatch(UpdateHouseReleased(user.release))
                    } else {
                        dispatch(UpdateHouseReleased(data.data))
                    }
                }
                else if (type === 4) {
                    if (page > 1) {
                        for (let x in data.data) {
                            user.traded.push(data.data[x])
                        }
                        dispatch(UpdateHouseTraded(user.traded))
                    } else {
                        dispatch(UpdateHouseTraded(data.data))
                    }
                }
                actions()
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

                Toast.warning("加载失败!")
            }
        }).catch(code => {

            Toast.warning("加载失败!")
        })

    }
}


export const modifyRelease = (data, action = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/House/edit_release', data, user.token)
            .then((data) => {

                if (data.code === 0) {

                    Toast.success("修改成功!")
                    // dispatch(getUserInfo())
                    action()
                } else if (data.code === -300) {


                    if (user.islogin) {
                        Toast.warning("登录超时!")
                        dispatch(LogoutLogin())
                    }
                } else if (data.code === -1) {
                    Toast.warning("已无法修改!")

                } else {
                    Toast.warning("修改失败!")
                }
            }).catch(() => {
                Toast.warning("修改失败!")

            })
    }
}



/**
 * 获取首页轮播
 */
export const getCarouselList = (data, page, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        // console.log(data)
        FormDataPost('/api/index/get_carousel_list', data, user.token).then((data) => {
            // console.log(data)
            if (data.code === 0) {
                dispatch(UpdateCarouselList(data.data))

                actions()
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else if (data.code === -1) {
                Toast.warning("暂时没有轮播图!")
                actions()
            }
        }).catch(code => {
            Toast.warning("获取失败!")
            actions()
        })

    }
}
/**
 * 获取文章列表
 */
export const getUserArticle = (data, page, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()

        FormDataPost('/api/article/get_article_list', data, user.token).then((data) => {

            if (data.code === 0) {
                if (page > 1) {
                    for (let x in data.data) {
                        user.article.push(data.data[x])
                    }
                    dispatch(UpdateUserArticle(user.article))
                }
                dispatch(UpdateUserArticle(data.data))

                actions()
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else if (data.code === -1) {
                // Toast.warning("暂时没有资讯!")
                actions()
            }
        }).catch(code => {

            actions()
        })

    }
}
/**
 * 获取文章列表
 */
export const getArticleDetail = (data, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()

        FormDataPost('/api/article/get_article', data, user.token).then((data) => {

            if (data.code === 0) {
                dispatch(UpdateArticleDetail(data.data))
                actions()
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else if (data.code === -1) {
                // Toast.warning("暂时没有资讯!")
                actions()
            }
        }).catch(code => {

            actions()
        })

    }
}

/**
     * 提现
     */
// export const payWithdraw = (data, navigation, loading = () => { }) => {
//     return (dispatch, getState) => {
//         const { user } = getState()
//         fetchPost('/user/pay/withdraw', data, user.token)
//             .then((data) => {
//                 loading()
//                 if (data.code === 0) {
//                     Toast.warning('提现申请成功')
//                     dispatch(getUserInfo())
//                     dispatch(getLogBalance({ page: 1 }))
//                     navigation()
//                 } else if (data.code == -300) {
//                     Toast.warning('登录超时')
//                     if (user.islogin) {                     dispatch(LogoutLogin())                 }
//                 } else if (data.code == -1) {
//                     Toast.warning('金额不正确')
//                 } else if (data.code == -2) {
//                     Toast.warning('余额不足')
//                 } else if (data.code == -3) {
//                     Toast.warning('未绑定微信登录')
//                 } else if (data.code == -4) {
//                     Toast.warning('未实名认证')
//                 } else if (data.code == -5) {
//                     Toast.warning('微信服务器通信失败')
//                 } else if (data.code == -6) {
//                     Toast.warning('系统繁忙,请稍后再试')
//                 } else if (data.code == -7) {
//                     Toast.warning('付款人身份校验不通过')
//                 } else if (data.code == -8) {
//                     Toast.warning('用户微信支付账户未知名,无法付款')
//                 } else if (data.code == -9) {
//                     Toast.warning('今日付款次数超过限制')
//                 } else if (data.code == -10) {
//                     Toast.warning('微信内部接口调用发生错误')
//                 } else if (data.code == -22) {
//                     Toast.warning('支付密码不正确')
//                 }
//                 else {
//                     Toast.warning('提现失败')
//                 }
//             }).catch(() => {
//                 loading()
//                 Toast.warning('提现失败')

//             })
//     }
// }



