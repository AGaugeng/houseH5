
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
    width: deviceWidth,
    height: scaleSize(850)
  },
  map: {
    // flex: 1,
    width: deviceWidth,
    height: scaleSize(416)
  },
  svg: {
    width: scaleSize(44),
    height: scaleSize(44),

  },
  avatar: {
    width: scaleSize(44),
    height: scaleSize(44),
    borderRadius: '50%',
    marginRight:scaleSize(20)
  },
  call: {
    width: scaleSize(28),
    height: scaleSize(28),
    marginRight: scaleSize(20)
  },
  houseImg: {
    // flex: 1,
    width: scaleSize(324),
    height: scaleSize(210)
  },
  tab: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: scaleSize(25),
    marginRight: scaleSize(25),
    marginBottom: scaleSize(30),
    justifyContent: 'space-around'
  },
  inputText: {
    height: deviceHeight * 0.2,
    // backgroundColor: 'transparent',
    fontSize: 14,
    outline: 'none',
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
