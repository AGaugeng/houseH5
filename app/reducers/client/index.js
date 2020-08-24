
import {
    UPDATE_CLIENT_RENT,
    UPDATE_CLIENT_SELL,
    UPDATE_CLIENT_VIEWLOG,
    UPDATE_CLIENT_INFO,
    UPDATE_VIEW_LOG_DETAILL,
    UPDATE_MY_CLIENT_SELL,
    UPDATE_MY_CLIENT_RENT,
    UPDATE_SEE_LIST
} from '../../actions/actionTypes'


let initialState = {

    selllist: [],
    rentlist: [],
    myselllist: [],
    myrentlist: [],
    viewlog: [],
    clientinfo: {},
    datail: {},
    seelist: []

}
export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_CLIENT_RENT:
            return { ...state, rentlist: state.rentlist = action.rentlist }
        case UPDATE_CLIENT_SELL:
            return { ...state, selllist: state.selllist = action.selllist }
        case UPDATE_MY_CLIENT_SELL:
            return { ...state, myselllist: state.myselllist = action.myselllist }
        case UPDATE_MY_CLIENT_RENT:
            return { ...state, myrentlist: state.myrentlist = action.myrentlist }
        case UPDATE_CLIENT_VIEWLOG:
            return { ...state, viewlog: state.viewlog = action.viewlog }
        case UPDATE_CLIENT_INFO:
            return { ...state, clientinfo: state.clientinfo = action.clientinfo }
        case UPDATE_VIEW_LOG_DETAILL:
            return { ...state, datail: state.datail = action.datail }
        case UPDATE_SEE_LIST:
            return { ...state, seelist: state.seelist = action.seelist }
        default:
            return state
    }
}
