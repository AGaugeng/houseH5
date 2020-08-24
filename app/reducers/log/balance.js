
import { UPDATE_LOG_BALANCE } from '../../actions/actionTypes'

let initialState = {

    data: [],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_LOG_BALANCE:
            return { ...state, data: state.data = action.data }
        default:
            return state
    }
}
