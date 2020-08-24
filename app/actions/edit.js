import { fetchPost, FormDataPost } from '../network'
import {
    UPDATE_SELL_TAG,
    UPDATE_RENT_TAG,
    UPDATE_RENT_EQUIP,
    UPDATE_CLIENT_INFO,
    UPDATE_VIEW_LOG_DETAILL,
    UPDATE_MY_CLIENT_SELL,
    UPDATE_MY_CLIENT_RENT,
    UPDATE_SEE_LIST
} from './actionTypes'



export const UpdateSellTag = selltag => ({
    type: UPDATE_SELL_TAG,
    selltag
})

export const UpdateRentTag = renttag => ({
    type: UPDATE_RENT_TAG,
    renttag
})

export const UpdateRentEquip = rentequip => ({
    type: UPDATE_RENT_EQUIP,
    rentequip
})