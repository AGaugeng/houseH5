import {  scaleSize, deviceHeight } from "../../ScreenUtil"
import { Platform } from "react-native"
export default {
    container: {
        backgroundColor: "#FFF",
        height: deviceHeight
    },
    mb10: {
        marginBottom: 10
    },
    header: {
        // zIndex: 99,
        flexDirection: "row", // 水平排布
        paddingTop: Platform.OS === "ios" ? 20 : 0, // 处理iOS状态栏
        height: Platform.OS === "ios" ? 68 : 48, // 处理iOS状态栏
        backgroundColor: "#fff",
        alignItems: "center", // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
        paddingLeft: scaleSize(36),
        paddingRight: scaleSize(36)
    },
    sectionNear: {
        marginLeft: scaleSize(36),
        marginRight: scaleSize(36)
    },
    logo: {
        marginTop: scaleSize(18),
        height: scaleSize(32),
        width: scaleSize(32),
        resizeMode: "stretch" // 设置拉伸模式
    },
    city: {
        marginTop: scaleSize(16),
        marginLeft: scaleSize(8),
        color: "#333",
        fontSize: 14
    },
    searchBox: {
        height: scaleSize(70),
        width: scaleSize(548),
        flexDirection: "row",
        flex: 1, // 类似于android中的layout_weight,设置为1即自动拉伸填充
        borderRadius: scaleSize(60), // 设置圆角边
        backgroundColor: "#F3F3F3",
        alignItems: "center",
        // marginLeft: 8,
        marginRight: scaleSize(26),
        marginLeft: scaleSize(26)
    },
    scanIcon: {
        marginTop: scaleSize(20),
        width: scaleSize(32),
        height: scaleSize(32),
        resizeMode: "stretch"
    },
    chooseIcon: {
        // marginTop: scaleSize(20),
        width: scaleSize(18),
        height: scaleSize(9),
        resizeMode: "stretch"
    },
    searchIcon: {
        marginLeft: scaleSize(24),
        marginRight: scaleSize(16),
        width: scaleSize(34),
        height: scaleSize(34),
        resizeMode: "stretch"
    },
    voiceIcon: {
        marginLeft: scaleSize(10),
        marginRight: scaleSize(16),
        width: scaleSize(30),
        height: scaleSize(40),
        resizeMode: "stretch"
    },
    inputText: {
        flex: 1,
        padding: 0,
        // backgroundColor: 'transparent',
        fontSize: 14,
        outline: 'none',
    },
    tab: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: scaleSize(25),
        marginRight: scaleSize(25),
        marginBottom: scaleSize(30),
        justifyContent: 'space-around'
    },
};
