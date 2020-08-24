import {
    UPDATE_WX_LOAD
} from '../../actions/actionTypes'

let initialState = {
    wxload: false
}
export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_WX_LOAD:
            return { ...state, wxload: state.wxload = action.wxload }
        default:
            return state
    }
}
