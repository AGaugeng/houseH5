
import { scaleSize } from "../../ScreenUtil"
export default {
  container: {
    backgroundColor: "#FFF"
  },
  mg: {
    paddingLeft: scaleSize(92),
    paddingRight: scaleSize(92)
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
  share: {
    marginTop: scaleSize(121),
    paddingLeft: scaleSize(92),
    paddingRight: scaleSize(92)
  },
  tab: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: scaleSize(25),
    marginRight: scaleSize(25),
    marginBottom: scaleSize(30),
    justifyContent: 'space-around'
  },
  img: {
    width: scaleSize(148),
    height: scaleSize(148)
  },
  noneImg: {
    width: scaleSize(90),
    height: scaleSize(111)
  }
};
