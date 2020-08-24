
import {
    UPDATE_SELL_TAG,
    UPDATE_RENT_TAG,
    UPDATE_RENT_EQUIP,
    UPDATE_CLIENT_INFO,
    UPDATE_VIEW_LOG_DETAILL,
    UPDATE_MY_CLIENT_SELL,
    UPDATE_MY_CLIENT_RENT,
    UPDATE_SEE_LIST
} from '../../actions/actionTypes'


let initialState = {

    selltag: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    renttag: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    rentequip: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]

}
export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_SELL_TAG:
            return { ...state, selltag: state.selltag = action.selltag }
        case UPDATE_RENT_TAG:
            return { ...state, renttag: state.renttag = action.renttag }
        case UPDATE_RENT_EQUIP:
            return { ...state, rentequip: state.rentequip = action.rentequip }

        default:
            return state
    }
}
