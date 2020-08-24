import { fetchPost, FormDataPost } from '../network'
import {
    UPDATE_HOUSE_PRICE,
    UPDATE_HOUSE_TYPE,
    UPDATE_HOUSE_ORIENTATION,
    UPDATE_HOUSE_AREA,
    UPDATE_HOUSE_FLOOR,
    UPDATE_HOUSE_AGE,
    UPDATE_HOUSE_USE_RIGHTS,
    UPDATE_HOUSE_LAYOUT,
    // UPDATE_HOUSE_LABEL,
    UPDATE_RESOLD_LABEL,
    UPDATE_RENTAL_LABEL,
    UPDATE_HOUSE_EQUIPMENT,
    UPDATE_SELECT_PRICE,
    UPDATE_SELECT_TYPE,
    UPDATE_SELECT_ORIENTATION,
    UPDATE_SELECT_AREA,
    UPDATE_SELECT_FLOOR,
    UPDATE_SELECT_AGE,
    UPDATE_SELECT_USE_RIGHTS,
    UPDATE_SELECT_LAYOUT,

    UPDATE_SELECT_EQUIPMENT,
    UPDATE_RENTAL_HOUSE,
    UPDATE_RESOLD_HOUSE,
    UPDATE_NEW_HOUSE,
    UPDATE_RENTAL_HOUSE_INFO,
    UPDATE_RESOLD_HOUSE_INFO,
    UPDATE_NEW_HOUSE_INFO,
    UPDATE_DETAIL_HOUSE_INFO,
    UPDATE_DETAIL_HOUSE_RECODE,
    UPDATE_DETAIL_HOUSE_PAY,

    UPDATE_HOUSE_CONTRACT,
    UPDATE_RENTAL_CONTRACT_LIST,
    UPDATE_SELL_CONTRACT_LIST,
    UPDATE_SCHEDULE_RECODE,
    UPDATE_FILE_CALLBACK_A,
    UPDATE_FILE_CALLBACK_B,
    UPDATE_RENT_CHANGE,
    UPDATE_RESOLD_CHANGE,
    UPDATE_HOUSE_STRUCT,
    UPDATE_COMMUNITY
} from './actionTypes'
// import { StartLinkFaceclean } from './LinkFace'
import { LogoutLogin } from './auth'
// import { WeixinPay } from './WeChat'
import Toast from '../tool/toast'
// import Loading from '../tool/loading'
// import { getUserInfo } from './user'


//获取
export const UpdateHousePrice = price => ({
    type: UPDATE_HOUSE_PRICE,
    price
})

export const UpdateHouseType = housetype => ({
    type: UPDATE_HOUSE_TYPE,
    housetype
})


export const UpdateHouseOrientation = orientation => ({
    type: UPDATE_HOUSE_ORIENTATION,
    orientation
})

export const UpdateHouseArea = acreage => ({
    type: UPDATE_HOUSE_AREA,
    acreage
})

export const UpdateHouseFloor = floor => ({
    type: UPDATE_HOUSE_FLOOR,
    floor
})

export const UpdateHouseAge = age => ({
    type: UPDATE_HOUSE_AGE,
    age
})

export const UpdateHouseUseRights = userights => ({
    type: UPDATE_HOUSE_USE_RIGHTS,
    userights
})
export const UpdateHouseLayout = layout => ({
    type: UPDATE_HOUSE_LAYOUT,
    layout
})

// export const UpdateHouseLabel = label => ({
//     type: UPDATE_HOUSE_LABEL,
//     label
// })



export const UpdateHouseEquipment = equipment => ({
    type: UPDATE_HOUSE_EQUIPMENT,
    equipment
})

//选择
export const UpdateSelectPrice = selectprice => ({
    type: UPDATE_SELECT_PRICE,
    selectprice
})

export const UpdateSelectType = selecthousetype => ({
    type: UPDATE_SELECT_TYPE,
    selecthousetype
})


export const UpdateSelectOrientation = selectorientation => ({
    type: UPDATE_SELECT_ORIENTATION,
    selectorientation
})

export const UpdateSelectArea = selectacreage => ({
    type: UPDATE_SELECT_AREA,
    selectacreage
})

export const UpdateSelectFloor = selectfloor => ({
    type: UPDATE_SELECT_FLOOR,
    selectfloor
})

export const UpdateSelectAge = selectage => ({
    type: UPDATE_SELECT_AGE,
    selectage
})

export const UpdateSelectUseRights = selectuserights => ({
    type: UPDATE_SELECT_USE_RIGHTS,
    selectuserights
})
export const UpdateSelectLayout = selectlayout => ({
    type: UPDATE_SELECT_LAYOUT,
    selectlayout
})

export const UpdateResoldLabel = resoldlabel => ({
    type: UPDATE_RESOLD_LABEL,
    resoldlabel
})
export const UpdateRentalLabel = rentallabel => ({
    type: UPDATE_RENTAL_LABEL,
    rentallabel
})



export const UpdateSelectEquipment = selectequipment => ({
    type: UPDATE_SELECT_EQUIPMENT,
    selectequipment
})


export const UpdateSearchResoldHouse = resoldhouse => ({
    type: UPDATE_RESOLD_HOUSE,
    resoldhouse
})

export const UpdateSearchRentalHouse = rentalhouse => ({
    type: UPDATE_RENTAL_HOUSE,
    rentalhouse
})

export const UpdateSearchNewhouse = newhouse => ({
    type: UPDATE_NEW_HOUSE,
    newhouse
})


export const UpdateResoldHouseInfo = resoldinfo => ({
    type: UPDATE_RESOLD_HOUSE_INFO,
    resoldinfo
})

export const UpdateRentalHouseInfo = rentalinfo => ({
    type: UPDATE_RENTAL_HOUSE_INFO,
    rentalinfo
})
export const UpdateNewHouseInfo = newinfo => ({
    type: UPDATE_NEW_HOUSE_INFO,
    newinfo
})

export const UpdateRentChange = rentchange => ({
    type: UPDATE_RENT_CHANGE,
    rentchange
})

export const UpdateResoldChange = resoldchange => ({
    type: UPDATE_RESOLD_CHANGE,
    resoldchange
})

export const UpdateDetailHouseInfo = detail => ({
    type: UPDATE_DETAIL_HOUSE_INFO,
    detail
})

export const UpdateDetailHouseRecode = recode => ({
    type: UPDATE_DETAIL_HOUSE_RECODE,
    recode
})
export const UpdateDetailPay = housepay => ({
    type: UPDATE_DETAIL_HOUSE_PAY,
    housepay
})



export const UpdateHouseContract = contract => ({
    type: UPDATE_HOUSE_CONTRACT,
    contract
})
export const UpdateRentalContractList = rentalcontract => ({
    type: UPDATE_RENTAL_CONTRACT_LIST,
    rentalcontract
})
export const UpdateSellContractList = sellcontract => ({
    type: UPDATE_SELL_CONTRACT_LIST,
    sellcontract
})
export const UpdateScheduleRecode = schedule => ({
    type: UPDATE_SCHEDULE_RECODE,
    schedule
})

export const UpdateFileCallbackA = filecallbacka => ({
    type: UPDATE_FILE_CALLBACK_A,
    filecallbacka
})
export const UpdateFileCallbackB = filecallbackb => ({
    type: UPDATE_FILE_CALLBACK_B,
    filecallbackb
})

export const UpdateHouseStruct = struct => ({
    type: UPDATE_HOUSE_STRUCT,
    struct
})

export const UpdateCommunity = community => ({
    type: UPDATE_COMMUNITY,
    community
})


/**
 * 获取价格条件
 */
export const getHousePrice = () => {
    return (dispatch, getState) => {
        const { user } = getState()
        fetchPost('/api/Param/price_condition', '', user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateHousePrice(data.data))
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("参数加载失败!")
            }
        }).catch(code => {

        })
    }
}
//        
/**
    * 获取装修类型
    */
export const getHouseType = () => {
    return (dispatch, getState) => {
        const { user } = getState()
        fetchPost('/api/Param/get_decoration', '', user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateHouseType(data.data))
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("参数加载失败!")
            }
        }).catch(code => {

        })
    }
}
/**
 * 获取朝向
 */

export const getHouseOrientation = () => {
    return (dispatch, getState) => {
        const { user } = getState()
        fetchPost('/api/Param/house_direction', '', user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateHouseOrientation(data.data))
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }

            } else {
                Toast.warning("参数加载失败!")
            }
        }).catch(code => {

        })
    }
}
/**
 * 获取楼龄
 */
export const getHouseAge = (data, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        // Loading.show()
        fetchPost('/api/Param/hourse_age', data, user.token)
            .then((data) => {
                // Loading.hide()
                if (data.code === 0) {
                    dispatch(UpdateHouseAge(data.data))
                    setTimeout(() => {
                        actions()
                    }, 200)
                } else if (data.code === -300) {

                    if (user.islogin) {
                        Toast.warning("登录超时!")
                        dispatch(LogoutLogin())
                    }
                } else {

                }
            }).catch(code => {
                // Loading.hide()
            })
    }
}

/**
 * 获取楼层
 */
export const getHouseFloor = (actions = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        /* if (house.ordepackage.length === 0) { */
        // Loading.show()
        fetchPost('/api/Param/hourse_floor', '', user.token)
            .then((data) => {
                // Loading.hide()
                if (data.code === 0) {
                    dispatch(UpdateHouseFloor(data.data))
                    setTimeout(() => {
                        actions()
                    }, 200)
                } else if (data.code === -300) {

                    if (user.islogin) {
                        Toast.warning("登录超时!")
                        dispatch(LogoutLogin())
                    }
                } else {
                    Toast.warning("参数加载失败请重试!")
                }
            }).catch(code => {

            })
        /*  } else {
             actions()
         } */
    }
}

/**
 * 获取面积
 */
export const getHouseArea = () => {
    return (dispatch, getState) => {
        const { user } = getState()
        fetchPost('/api/Param/house_area', '', user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateHouseArea(data.data))
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
 * 获取产权用途
 */
export const getHouseUseRights = () => {
    return (dispatch, getState) => {
        const { user } = getState()
        fetchPost('/api/Param/get_property_use', '', user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateHouseUseRights(data.data))
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
 * 获取房型搜索
 */
export const getHouseLayout = () => {
    return (dispatch, getState) => {
        const { user } = getState()
        fetchPost('/api/Param/house_type_condition', '', user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateHouseLayout(data.data))
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
 * 获取标签
 */
export const getHouseLabel = (data, type) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/Param/get_tag', data, user.token).then((data) => {
            if (data.code === 0) {
                if (type === 'secondhand') {
                    dispatch(UpdateResoldLabel(data.data))
                } else {
                    dispatch(UpdateRentalLabel(data.data))
                }



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
 * 获取配备设备
 */
export const getHouseEquipment = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/Param/get_equipment', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateHouseEquipment(data.data))
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
 * 获取户型结构
 */
export const getHouseStruct = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/param/get_housetype_struc', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateHouseStruct(data.data))
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
 * 获取小区
 */
export const getCommunity = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/house/get_community', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateCommunity(data.data))
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
* 添加二手房
*/
export const addResoldHouse = (data, navigation = () => { }, reject = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()

        FormDataPost('/api/secondhand/add', data, user.token).then((data) => {

            if (data.code === 0) {
                Toast.success("添加成功!")

                navigation()
                dispatch(UpdateFileCallbackA([]))
                dispatch(UpdateFileCallbackB([]))
                // StartLinkFaceclean()
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                reject(data.code)
            }
        }).catch(() => {
            reject()
        })
    }
}



/**
* 编辑租房
*/

export const editResoldHouse = (data, navigation = () => { }, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/secondhand/edit', data, user.token).then((data) => {
            if (data.code === 0) {
                Toast.success("修改成功!")

                navigation()
                dispatch(UpdateFileCallbackA([]))
                dispatch(UpdateFileCallbackB([]))
                actions()
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("添加失败!")

            }
        }).catch(() => {

        })
    }
}
/**
 * 二手房搜索
 */
export const searchResoldHouse = (data, page, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user, house } = getState()
        FormDataPost('/api/secondhand/search', data, user.token).then((data) => {
            if (data.code === 0) {
                if (page > 1) {
                    for (let x in data.data) {
                        house.resoldhouse.push(data.data[x])
                    }
                    dispatch(UpdateSearchResoldHouse(house.resoldhouse))
                } else {
                    dispatch(UpdateSearchResoldHouse(data.data))
                }
                actions()
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
 * 二手房房源信息
 */
export const getResoldHouseInfo = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/Secondhand/get_info', data, user.token).then((data) => {

            if (data.code === 0) {
                dispatch(UpdateResoldHouseInfo(data.data))
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
 * 编辑房源->获取房源信息
 */
export const getHouseInfo = (data, type) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/house/house_info', data, user.token).then((data) => {
            if (data.code === 0) {
                if (type === 'rentinghouse') {
                    dispatch(UpdateRentChange(data.data))
                } else {
                    dispatch(UpdateResoldChange(data.data))
                }

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
* 添加租房
*/
export const addRentalHouse = (data, navigation = () => { }, reject = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/renting/add', data, user.token).then((data) => {
            if (data.code === 0) {
                Toast.success("添加成功!")

                navigation()
                dispatch(UpdateFileCallbackA([]))
                dispatch(UpdateFileCallbackB([]))
                // StartLinkFaceclean()
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {

                reject(data.code)
            }
        }).catch(() => {
            reject(data.code)
        })
    }
}

/**
* 编辑租房
*/

export const editRentalHouse = (data, navigation = () => { }, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()

        FormDataPost('/api/renting/edit', data, user.token).then((data) => {
            if (data.code === 0) {
                Toast.success("修改成功!")

                navigation()
                dispatch(UpdateFileCallbackA([]))
                dispatch(UpdateFileCallbackB([]))
                actions()
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                Toast.warning("添加失败!")

            }
        }).catch(() => {
            Toast.warning("添加失败!")
        })
    }
}

/**
 * 租房搜索
 */
export const searchRentalHouse = (data, page, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user, house } = getState()
        FormDataPost('/api/renting/search', data, user.token).then((data) => {
            if (data.code === 0) {
                if (page > 1) {
                    for (let x in data.data) {
                        house.rentalhouse.push(data.data[x])
                    }
                    dispatch(UpdateSearchRentalHouse(house.rentalhouse))
                } else {
                    dispatch(UpdateSearchRentalHouse(data.data))
                }

                actions()
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
 * 租房房源信息
 */
export const getRentalHouseInfo = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/Renting/get_info', data, user.token).then((data) => {

            if (data.code === 0) {
                dispatch(UpdateRentalHouseInfo(data.data))
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
 * 新房搜索
 */
export const searchNewhouse = (data, page, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user, house } = getState()
        FormDataPost('/api/Newhouse/search', data, user.token).then((data) => {

            if (data.code === 0) {
                if (page > 1) {
                    for (let x in data.data) {
                        house.newhouse.push(data.data[x])
                    }
                    dispatch(UpdateSearchNewhouse(house.newhouse))
                } else {
                    dispatch(UpdateSearchNewhouse(data.data))
                }

                actions()
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
 * 新房房源信息
 */
export const getNewHouseInfo = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/Newhouse/get_info', data, user.token).then((data) => {

            if (data.code === 0) {
                dispatch(UpdateNewHouseInfo(data.data))
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
 * 查看房源详细信息
 */
export const getDetailHouseInfo = (data, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/House/get_house_detail', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateDetailHouseInfo(data.data))
            } else if (data.code === -2) {
                dispatch(UpdateDetailHouseRecode(data.data))
                Toast.warning("您还有未完成的看房信息备注,请在下方认真填写!", 5000)

            } else if (data.code === -1) {
                Toast.warning("获取失败!")

            } else if (data.code === -3) {
                Toast.warning("您还不是会员不能查看!")

            } else if (data.code === -4) {
                dispatch(UpdateDetailPay(data.data))
                Toast.warning("今天已超过免费查看次数上限，需付费查看!")
                actions()
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            }
            else {

            }
        }).catch(code => {

        })

    }
}
/**
 * 填写查看房源详细信息备注
 */
export const writeViewHouseRecode = (data, navigation = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/House/house_detail_recode', data, user.token).then((data) => {
            if (data.code === 0) {
                Toast.success("提交成功!")
                navigation()
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else if (data.code === -2) {
                Toast.warning("请认真填写看房备注!")

            }
            else {

            }
        }).catch(code => {

        })

    }
}
/**
 * 查看房源合同列表
 */
export const getHouseContractList = (data, type, page, actions = () => { }) => {
    return (dispatch, getState) => {
        const { user, house } = getState()
        FormDataPost('/api/House/contract_list', data, user.token).then((data) => {
            if (data.code === 0) {
                if (type === 'rentinghouse') {
                    if (page > 1) {
                        for (let x in data.data) {
                            house.rentalcontract.push(data.data[x])
                        }
                        dispatch(UpdateRentalContractList(house.rentalcontract))
                    } else {
                        dispatch(UpdateRentalContractList(data.data))
                    }

                } else if (type === 'secondhand') {
                    if (page > 1) {
                        for (let x in data.data) {
                            house.sellcontract.push(data.data[x])
                        }
                        dispatch(UpdateSellContractList(house.sellcontract))
                    } else {
                        dispatch(UpdateSellContractList(data.data))
                    }

                }
                actions()
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else if (data.code === -2) {
                // Toast.warning("没有合同!")
                actions()
            } else {
                actions()
            }
        }).catch(code => {

        })

    }
}

/**
 * 查看房源合同
 */
export const getHouseContract = (data, navigation = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/House/get_contract', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateHouseContract(data.data))
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else if (data.code === -2) {
                // Toast.warning("没有合同!")
                navigation()
            }
            else {

            }
        }).catch(code => {

        })

    }
}
/**
 * 查看房源交易进度
 */
export const getScheduleRecode = (data, navigation = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/House/get_schedule_recode', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateScheduleRecode(data.data))
            } else if (data.code === -300) {

                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else if (data.code === -2) {
                Toast.warning("没有记录!")
                navigation()
            }
            else {

            }
        }).catch(code => {

        })

    }
}

/**
 * 上传文件
 */
export const UploadFile = (data, fulfill = () => { }, reject = () => { }) => {
    return (dispatch, getState) => {
        const { user } = getState()

        FormDataPost('/api/Common/upload_file?', data, user.token).then((data) => {

            if (data.code === -1) {
                Toast.warning(data.errMsg)
                // Toast.success("上传成功!")
                // dispatch(UpdateFileCallbackA([]))
                // dispatch(UpdateFileCallbackB([]))
            } else if (data.code === -300) {
                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                // console.log(data)
                fulfill(data)
            }
        }).catch(code => {

        })

    }
}
