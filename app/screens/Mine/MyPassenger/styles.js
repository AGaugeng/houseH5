
import { scaleSize, deviceHeight, deviceWidth } from "../../ScreenUtil"
export default {
  container: {
    backgroundColor: "#FFF"
  },
  mb10: {
    marginBottom: scaleSize(20)
  },
  imageContainer: {
    // flex: 1,
    width: scaleSize(750),
    height: scaleSize(400)
  },
  map: {
    // flex: 1,
    width: scaleSize(750),
    height: scaleSize(416)
  },
  svg: {
    width: scaleSize(44),
    height: scaleSize(44)
  },
  bgImg: {
    // flex: 1,
    width: scaleSize(28),
    height: scaleSize(30)
  },
  tab: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: scaleSize(25),
    marginRight: scaleSize(25),
    marginBottom: scaleSize(30),
    justifyContent: 'space-around'
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
    width: scaleSize(280)
  },
  voiceIcon: {
    marginLeft: scaleSize(10),
    marginRight: scaleSize(16),
    width: scaleSize(30),
    height: scaleSize(40),
    resizeMode: "stretch"
  },
  addImg: {
    width: scaleSize(100),
    height: scaleSize(100),
  },
  Remark: {
    height: deviceHeight * 0.2,
    // backgroundColor: 'transparent',
    fontSize: 14,
    textAlignVertical: "top",
    padding: 0,
    marginLeft: scaleSize(20),
    marginTop: scaleSize(20)
  },
  inputContainer: {
    width: deviceWidth - scaleSize(72),
    marginLeft: scaleSize(36),
    backgroundColor: '#eff3f6',
    borderRadius: scaleSize(20)
  }
};
