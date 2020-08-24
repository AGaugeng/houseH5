
import { scaleSize, deviceWidth, deviceHeight } from "../../ScreenUtil"
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
  houseImg: {
    // flex: 1,
    width: scaleSize(324),
    height: scaleSize(210)
  },
  tab: {
    flexDirection: 'row',
    flexWrap:'wrap',
    marginLeft: scaleSize(25),
    marginRight: scaleSize(25),
    marginBottom: scaleSize(30),
    justifyContent: 'space-around'
  },
  section: {
    backgroundColor: '#f4f4f4',
    height: '100%'
  },
  addImg: {
    // flex: 1,
    width: scaleSize(117),
    height: scaleSize(111),
    marginTop: deviceHeight / 4,
    alignSelf: 'center',
  },
  nocollet: {
    height: deviceHeight,
    width: deviceWidth,
    // backgroundColor: '#f4f4f4'
  },
  text: {
    color: '#999',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: scaleSize(37)
  },
};
