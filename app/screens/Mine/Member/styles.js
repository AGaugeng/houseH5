
import { scaleSize } from "../../ScreenUtil"
export default {
  container: {
    backgroundColor: "#FFF"
  },
  joinContainer: {
    backgroundColor: "#F4F4F4"
  },
  mb10: {
    marginBottom: scaleSize(20)
  },
  bgImg: {
    // flex: 1,
    width: scaleSize(678),
    height: scaleSize(198),
    marginTop: scaleSize(31),
    // marginLeft: scaleSize(72),
    borderRadius: scaleSize(100),
    alignSelf: 'center'
  },
  dotImg: {
    // flex: 1,
    width: scaleSize(18),
    height: scaleSize(18),
    marginRight: scaleSize(27)
  },
  addImg: {
    // flex: 1,
    width: scaleSize(314),
    height: scaleSize(220),
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
    flexWrap: 'wrap',
    marginLeft: scaleSize(25),
    marginRight: scaleSize(25),
    marginBottom: scaleSize(30),
    justifyContent: 'space-around'
  },
  inputText: {
    padding: 0,
    // Top: 5,
    // backgroundColor: 'transparent',
    fontSize: 14,
    outline: 'none',
    color: '#666'
  },
  avatar: {
    width: scaleSize(80),
    height: scaleSize(80),
    borderRadius: scaleSize(40)
  },
  dot: {
    width: scaleSize(12),
    height: scaleSize(12),
    backgroundColor: '#e64e37',
    borderRadius: scaleSize(6),
    marginRight: scaleSize(11)
  }
};
