import { scaleSize, deviceWidth} from "../ScreenUtil"
export default {
    container: {
        backgroundColor: "#fff",
    },
    logo: {
        marginTop: scaleSize(30),
        height: scaleSize(9),
        width: scaleSize(18),
        marginLeft: scaleSize(6),
        resizeMode: "stretch" // 设置拉伸模式
    },
    city: {
        marginTop: scaleSize(16),
        marginLeft: scaleSize(43),
        color: "#333",
        fontSize: 12
    },
    searchBox: {
        height: scaleSize(40),
        flexDirection: "row",
        flex: 1, // 类似于android中的layout_weight,设置为1即自动拉伸填充
        alignItems: "center",
        // marginLeft: 8,
        marginTop: scaleSize(20),
        marginRight: scaleSize(36),
        marginLeft: scaleSize(36)
    },
    scanIcon: {
        marginTop: scaleSize(20),
        width: scaleSize(32),
        height: scaleSize(32),
        resizeMode: "stretch"
    },
    searchIcon: {
        marginRight: scaleSize(13),
        width: scaleSize(25),
        height: scaleSize(25),
        resizeMode: "stretch"
    },
    inputText: {
        flex: 1,
        padding: 0,
        color: '#999',
        backgroundColor: 'transparent',
       fontSize: 14,
    outline: 'none',
    },
    imageContainer: {
        // flex: 1,
        width: deviceWidth,
        height: scaleSize(605)
    },
    sectionNear:{
        marginLeft: scaleSize(36),
        marginRight: scaleSize(36)
    },
}
