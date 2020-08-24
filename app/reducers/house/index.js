
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

    UPDATE_RENTAL_LABEL,
    UPDATE_RESOLD_LABEL,

    UPDATE_HOUSE_EQUIPMENT,

    UPDATE_SELECT_PRICE,
    UPDATE_SELECT_TYPE,
    UPDATE_SELECT_ORIENTATION,
    UPDATE_SELECT_AREA,
    UPDATE_SELECT_FLOOR,
    UPDATE_SELECT_AGE,
    UPDATE_SELECT_USE_RIGHTS,
    UPDATE_SELECT_LAYOUT,
    UPDATE_SELECT_LABEL,

    UPDATE_SELECT_EQUIPMENT,

    UPDATE_RENTAL_HOUSE,
    UPDATE_RESOLD_HOUSE,
    UPDATE_NEW_HOUSE,
    UPDATE_RENTAL_HOUSE_INFO,
    UPDATE_RESOLD_HOUSE_INFO,

    UPDATE_RENT_CHANGE,
    UPDATE_RESOLD_CHANGE,

    UPDATE_NEW_HOUSE_INFO,
    UPDATE_DETAIL_HOUSE_INFO,
    UPDATE_DETAIL_HOUSE_RECODE,
    UPDATE_HOUSE_CONTRACT,
    UPDATE_RENTAL_CONTRACT_LIST,
    UPDATE_SELL_CONTRACT_LIST,
    UPDATE_SCHEDULE_RECODE,
    UPDATE_FILE_CALLBACK_B,
    UPDATE_FILE_CALLBACK_A,
    UPDATE_DETAIL_HOUSE_PAY,
    UPDATE_HOUSE_STRUCT,
    UPDATE_COMMUNITY
} from '../../actions/actionTypes'


let initialState = {
    price: [],//价格条件
    housetype: [],//装修类型
    orientation: [],//朝向
    acreage: [],//面积
    floor: [],//楼层
    age: [],//楼龄
    userights: [],//产权用途
    layout: [],//房型
    resoldlabel: [],//二手房标签
    rentallabel: [],//租房标签
    equipment: [], //配备设备
    selectprice: 1,//价格条件
    selecthousetype: 1,//装修类型
    selectorientation: 1,//朝向
    selectacreage: 1,//面积
    selectfloor: 1,//楼层
    selectage: 1,//楼龄
    selectuserights: 1,//产权用途
    selectlayout: 1,//房型
    selectlabel: 1,//标签
    selectequipment: 1, //配备设备

    resoldhouse: [],
    rentalhouse: [],
    newhouse: [],
    resoldinfo: {},
    rentalinfo: {},
    newinfo: {},


    resoldchange: {},
    rentchange: {},

    detail: {},
    recode: {},

    housepay: {},
    contract: {},
    rentalcontract: [],
    sellcontract: [],
    schedule: [],
    filecallbacka: [],
    filecallbackb: [],
    struct: [],
    community: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        /* case UPDATE_ORDER_PROMISE:
            return { ...state, promise: state.promise = action.promise } */
        case UPDATE_HOUSE_PRICE:
            return { ...state, price: state.price = action.price }
        case UPDATE_HOUSE_TYPE:
            return { ...state, housetype: state.housetype = action.housetype }
        case UPDATE_HOUSE_ORIENTATION:
            return { ...state, orientation: state.orientation = action.orientation }
        case UPDATE_HOUSE_AREA:
            return { ...state, acreage: state.acreage = action.acreage }
        case UPDATE_HOUSE_FLOOR:
            return { ...state, floor: state.floor = action.floor }
        case UPDATE_HOUSE_AGE:
            return { ...state, age: state.age = action.age }
        case UPDATE_HOUSE_USE_RIGHTS:
            return { ...state, userights: state.userights = action.userights }
        case UPDATE_HOUSE_LAYOUT:
            return { ...state, layout: state.layout = action.layout }
        case UPDATE_RESOLD_LABEL:
            return { ...state, resoldlabel: state.resoldlabel = action.resoldlabel }
        case UPDATE_RENTAL_LABEL:
            return { ...state, rentallabel: state.rentallabel = action.rentallabel }
        case UPDATE_HOUSE_EQUIPMENT:
            return { ...state, equipment: state.equipment = action.equipment }
        case UPDATE_SELECT_PRICE:
            return { ...state, selectprice: state.selectprice = action.selectprice }
        case UPDATE_SELECT_TYPE:
            return { ...state, selecthousetype: state.selecthousetype = action.selecthousetype }
        case UPDATE_SELECT_ORIENTATION:
            return { ...state, selectorientation: state.selectorientation = action.selectorientation }
        case UPDATE_SELECT_AREA:
            return { ...state, selectacreage: state.selectacreage = action.selectacreage }
        case UPDATE_SELECT_FLOOR:
            return { ...state, selectfloor: state.selectfloor = action.selectfloor }
        case UPDATE_SELECT_AGE:
            return { ...state, selectage: state.selectage = action.selectage }
        case UPDATE_SELECT_USE_RIGHTS:
            return { ...state, selectuserights: state.selectuserights = action.selectuserights }
        case UPDATE_SELECT_LAYOUT:
            return { ...state, selectlayout: state.selectlayout = action.selectlayout }
        case UPDATE_SELECT_LABEL:
            return { ...state, selectlabel: state.selectlabel = action.selectlabel }
        case UPDATE_SELECT_EQUIPMENT:
            return { ...state, selectequipment: state.selectequipment = action.selectequipment }
        case UPDATE_RENTAL_HOUSE:
            return { ...state, rentalhouse: state.rentalhouse = action.rentalhouse }
        case UPDATE_RESOLD_HOUSE:
            return { ...state, resoldhouse: state.resoldhouse = action.resoldhouse }
        case UPDATE_NEW_HOUSE:
            return { ...state, newhouse: state.newhouse = action.newhouse }
        case UPDATE_RENTAL_HOUSE_INFO:
            return { ...state, rentalinfo: state.rentalinfo = action.rentalinfo }
        case UPDATE_RESOLD_HOUSE_INFO:
            return { ...state, resoldinfo: state.resoldinfo = action.resoldinfo }
        case UPDATE_NEW_HOUSE_INFO:
            return { ...state, newinfo: state.newinfo = action.newinfo }
        case UPDATE_DETAIL_HOUSE_INFO:
            return { ...state, detail: state.detail = action.detail }
        case UPDATE_RENT_CHANGE:
            return { ...state, rentchange: state.rentchange = action.rentchange }
        case UPDATE_RESOLD_CHANGE:
            return { ...state, resoldchange: state.resoldchange = action.resoldchange }
        case UPDATE_DETAIL_HOUSE_RECODE:
            return { ...state, recode: state.recode = action.recode }
        case UPDATE_HOUSE_CONTRACT:
            return { ...state, contract: state.contract = action.contract }
        case UPDATE_RENTAL_CONTRACT_LIST:
            return { ...state, rentalcontract: state.rentalcontract = action.rentalcontract }
        case UPDATE_SELL_CONTRACT_LIST:
            return { ...state, sellcontract: state.sellcontract = action.sellcontract }
        case UPDATE_SCHEDULE_RECODE:
            return { ...state, schedule: state.schedule = action.schedule }
        case UPDATE_FILE_CALLBACK_A:
            return { ...state, filecallbacka: state.filecallbacka = action.filecallbacka }
        case UPDATE_FILE_CALLBACK_B:
            return { ...state, filecallbackb: state.filecallbackb = action.filecallbackb }
        case UPDATE_DETAIL_HOUSE_PAY:
            return { ...state, housepay: state.housepay = action.housepay }
        case UPDATE_HOUSE_STRUCT:
            return { ...state, struct: state.struct = action.struct }
        case UPDATE_COMMUNITY:
            return { ...state, community: state.community = action.community }
        default:
            return state
    }
}
