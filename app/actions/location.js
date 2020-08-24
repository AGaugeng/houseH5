import { fetchPost, FormDataPost } from '../network'
import {
    UPDATE_LOCATION,
    UPDATE_AREA_CHILD,
    UPDATE_AREA_BROTHER,
    UPDATE_LOCATION_ADDRESS,
    UPDATE_LOCATION_INFO,
    UPDATE_NEARBY_ROOM,
    UPDATE_AREA_CHILD_TWO
} from './actionTypes'
import Toast from '../tool/toast'
import { LogoutLogin } from "./auth"
export const UpdateLocation = location => ({
    type: UPDATE_LOCATION,
    location
})
export const UpdateLocationAddress = address => ({
    type: UPDATE_LOCATION_ADDRESS,
    address
})
export const UpdateNearByRoom = nearbyroom => ({
    type: UPDATE_NEARBY_ROOM,
    nearbyroom
})
export const UpdateLocationInfo = area => ({
    type: UPDATE_LOCATION_INFO,
    area
})

export const UpdateAreaChild = areachild => ({
    type: UPDATE_AREA_CHILD,
    areachild
})

export const UpdateAreaChildV2 = areachildv2 => ({
    type: UPDATE_AREA_CHILD_TWO,
    areachildv2
})
export const UpdateAreaBrother = areabrother => ({
    type: UPDATE_AREA_BROTHER,
    areabrother
})

export const locationSave = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        fetchPost('/location/save', data, user.token)
            .then((data) => {
                /* if (data.code === 0) {
                   Toast.warning('位置坐标上报成功')
               } else {
                   Toast.warning('位置坐标上报失败')
               } */
            }).catch(() => {
                /* Toast.warning('位置坐标上报失败') */
            })
    }
}

/**
    * 通过经纬度获取位置信息
    */
export const getLocationInfo = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/area/get_location_info', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateLocationInfo(data.data))
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
    * 获取附近门店
    */
export const getNearByRoom = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/Agent/getNearbyAgent', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateNearByRoom(data.data))
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                dispatch(UpdateNearByRoom())

            }
        }).catch(code => {

            // alert(code)
        })
    }
}
/**
    * 获取子级地区
    */
export const getAreaChild = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/Area/get_area_child', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateAreaChild(data.data))
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                dispatch(UpdateAreaChild())

            }
        }).catch(code => {

            // alert(code)
        })
    }
}
/**
    * 获取子级地区
    */
export const getAreaChildV2 = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/Area/get_area_child', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateAreaChildV2(data.data))
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                dispatch(UpdateAreaChildV2())
            }
        }).catch(code => {

            // alert(code)
        })
    }
}
/**
    * 获取同级地区
    */
export const getAreaBrother = (data) => {
    return (dispatch, getState) => {
        const { user } = getState()
        FormDataPost('/api/Area/get_area_brother', data, user.token).then((data) => {
            if (data.code === 0) {
                dispatch(UpdateAreaBrother(data.data))
            } else if (data.code === -300) {


                if (user.islogin) {
                    Toast.warning("登录超时!")
                    dispatch(LogoutLogin())
                }
            } else {
                dispatch(UpdateAreaBrother())
            }
        }).catch(code => {

            // alert(code)
        })
    }
}
