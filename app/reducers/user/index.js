import {
    UPDATE_USER_INFORMATION,
    // UPDATE_CREATE_RECOMMEND_CODE,
    UPDATE_USER_TOKEN,
    DELETE_USER_TOKEN,
    UPDATE_RECOMMEND_CODE,
    UPDATE_USER_AVATAR,
    // UPDATE_MY_COLLECTION
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
} from '../../actions/actionTypes'

let initialState = {
    info: {},
    islogin: false,
    level: { rule: [] },
    token: {},
    resoldcollect: [],
    newcollect: [],
    rentalcollect: [],
    recommendcode: {},
    avatar: '',
    sharelist: [],
    all: [],
    pending: [],
    release: [],
    traded: [],
    article: [],
    articledetail: {},
    carousel: [],
    memberinfo: {}
}
export default function (state = initialState, action) {

    switch (action.type) {
        case UPDATE_RECOMMEND_CODE:
            return { ...state, recommendcode: state.recommendcode = action.recommendcode }
        case UPDATE_USER_INFORMATION:
            return { ...state, info: state.info = action.info }
        case UPDATE_USER_TOKEN:
            return { ...state, token: state.token = action.token }
        case UPDATE_USER_AVATAR:
            return { ...state, avatar: state.avatar = action.avatar }
        case DELETE_USER_TOKEN:
            return { ...state, token: {}, info: {} }
        case UPDATE_RESOLD_COLLECTION:
            return { ...state, resoldcollect: state.resoldcollect = action.resoldcollect }
        case UPDATE_NEW_COLLECTION:
            return { ...state, newcollect: state.newcollect = action.newcollect }
        case UPDATE_RENTAL_COLLECTION:
            return { ...state, rentalcollect: state.rentalcollect = action.rentalcollect }
        case UPDATE_USER_LEVEL:
            return { ...state, level: state.level = action.level }
        case UPDATE_SHARE_LIST:
            return { ...state, sharelist: state.sharelist = action.sharelist }
        case UPDATE_HOUSE_MANAGE:
            return { ...state, all: state.all = action.all }
        case UPDATE_HOUSE_PENDING:
            return { ...state, pending: state.pending = action.pending }
        case UPDATE_HOUSE_RELEASED:
            return { ...state, release: state.release = action.release }
        case UPDATE_HOUSE_TRADED:
            return { ...state, traded: state.traded = action.traded }
        case UPDATE_LOGIN_STATE:
            return { ...state, islogin: state.islogin = action.islogin }
        case UPDATE_USER_ARTICLE:
            return { ...state, article: state.article = action.article }
        case UPDATE_RTICLE_DETAIL:
            return { ...state, articledetail: state.articledetail = action.articledetail }
        case UPDATE_CAROUSEL_LIST:
            return { ...state, carousel: state.carousel = action.carousel }
        case UPDATE_MEMBER_INFO:
            return { ...state, memberinfo: state.memberinfo = action.memberinfo }
        default:
            return state
    }
}
