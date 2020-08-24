
import { scaleSize, deviceHeight } from "../ScreenUtil"
export default {
    imageContainer: {
        // flex: 1,
        width: '100%',
        height: scaleSize(325)
    },
    logoContainer: {
        flex: 1,
        marginTop: deviceHeight / 8,
        marginBottom: 30,
        alignItems: "center"
    },
    title: {
        color: '#666',
        marginTop: scaleSize(20),
        fontSize: 14
    },
    text: {
        color: "#D8D8D8",
        bottom: scaleSize(12),
        marginTop: scaleSize(10)
    },
    sectionNear: {
        marginLeft: scaleSize(36),
        marginRight: scaleSize(36)
    },
    logo: {
        // marginTop: scaleSize(36),
        height: scaleSize(9),
        width: scaleSize(18),
        marginLeft: scaleSize(6),
        resizeMode: "stretch" // 设置拉伸模式
    },
    city: {
        // marginTop: scaleSize(30),
        marginLeft: scaleSize(43),
        color: "#333",
        fontSize: 14
    },
    searchBox: {
        height: scaleSize(40),
        flexDirection: "row",
        flex: 1, // 类似于android中的layout_weight,设置为1即自动拉伸填充
        alignItems: "center",
        // marginLeft: 8,
        marginTop: scaleSize(20),
        borderLeftWidth: 1,
        borderLeftColor: '#E5E5E5',
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
        marginLeft: scaleSize(41),
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
    voiceIcon: {
        marginLeft: scaleSize(10),
        marginRight: scaleSize(16),
        width: scaleSize(30),
        height: scaleSize(40),
        resizeMode: "stretch"
    },
    imgContainer: {
        paddingLeft: 10,

        //  paddingRight: 5,
        alignItems: 'center',
    },
    navImg: {
        width: scaleSize(96),
        height: scaleSize(96)
    }
};
