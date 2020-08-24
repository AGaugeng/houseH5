import {
    scaleSize,
    deviceWidth,
    deviceHeight
} from "../../../ScreenUtil" //自适配大小
export default {
    container: {
        // flex: 1,
        // justifyContent: 'center',
        height: deviceHeight,
        backgroundColor: '#fff',
    },
    searchBox: {
        height: scaleSize(70),
        flexDirection: 'row',
        flex: 1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
        // borderRadius: scaleSize(20),  // 设置圆角边
        backgroundColor: '#fff',
        borderBottomWidth: scaleSize(2),
        borderBottomColor: '#eff3f6',
        alignItems: 'center',
        marginLeft: scaleSize(36),

    },

    bgColor: {
        borderRadius: scaleSize(40),
        width: deviceWidth - scaleSize(120),
        height: scaleSize(80),
        marginLeft: scaleSize(60),
        marginRight: scaleSize(60),
    },
    bgColorReg: {
        borderRadius: scaleSize(60),
        width: scaleSize(630),
        backgroundColor: '#e64e37',
        marginLeft: scaleSize(80),
        // marginRight: scaleSize(80),
    },
    inputText: {
        flex: 1,
        padding: 0,
        // backgroundColor: 'transparent',
        fontSize: 14,
        outline: 'none',
    },
    welcome: {
        marginLeft: scaleSize(36),
        fontSize: 16,
        color: '#000'
    },
    core: {
        color: '#333',
        marginRight: scaleSize(36),
        paddingBottom: scaleSize(36)
    },
    coreLogin: {
        marginBottom: scaleSize(36),
        marginLeft: scaleSize(36),
        fontSize: 18,
        color: '#000'
    },
    login: {
        color: '#fff',

    },
    login1: {
        color: '#fff',
        paddingLeft: (deviceWidth - scaleSize(120)) / 2 - scaleSize(60),
    },
    other: {
        width: deviceWidth * 0.36,
        color: '#ccc',
        marginLeft: deviceWidth * 0.36,
        marginRight: deviceWidth * 0.36,
        marginTop: scaleSize(100)

    },
    otherLogin: {
        flexDirection: 'row',
        marginTop: scaleSize(40),
        width: deviceWidth * 0.4,
        marginLeft: deviceWidth * 0.3,
        justifyContent: 'space-between',
        borderRadius: scaleSize(20),
        paddingLeft: scaleSize(36),
    },
    hospitalList: {
        flexDirection: 'row',
        marginTop: scaleSize(36),
        width: deviceWidth * 0.9,
        marginLeft: scaleSize(36),
        // borderRadius: scaleSize(20)
    },

    sign: {
        flexDirection: 'row',
        marginTop: scaleSize(36), width: deviceWidth * 0.9, marginLeft: scaleSize(36),
        justifyContent: 'space-between',
        borderRadius: scaleSize(20),
        paddingLeft: scaleSize(36),
    },
}
