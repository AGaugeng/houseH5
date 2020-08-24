
import {  scaleSize } from "../../ScreenUtil"
export default {
  container: {
    backgroundColor: "#FFF"
  },
  withBg: {
    backgroundColor: "#F4F4F4"
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
    width: scaleSize(36),
    height: scaleSize(36),
    paddingTop: scaleSize(20)
  },
  // share: {
  //   marginTop: scaleSize(121),
  //   paddingLeft: scaleSize(92),
  //   paddingRight: scaleSize(92)
  // },
  input: {
    backgroundColor: '#fff',
    paddingLeft: scaleSize(36),
    flexDirection: 'row',
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
  },
  inputText: {
    flex: 1,
    padding: 0,
    color: '#999',
    backgroundColor: 'transparent',
    fontSize: 14,
    outline: 'none',
  },
  share: {
    backgroundColor: '#fff',
    marginLeft: scaleSize(0),
    paddingLeft: scaleSize(36)

  },
  share1: {
    backgroundColor: '#fff',
    marginLeft: scaleSize(0),
    paddingLeft: scaleSize(36),
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
};
