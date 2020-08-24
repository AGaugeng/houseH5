import { scaleSize, deviceWidth, deviceHeight } from "../ScreenUtil"
export default {
  container: {
    backgroundColor: "#FFF"
  },
  imgContainer: {
    paddingLeft: scaleSize(20)
    //  paddingRight: 5,
  },
  navImg: {
    width: scaleSize(44),
    height: scaleSize(44)
  },
  avatar:{
    width: scaleSize(110),
    height: scaleSize(110),
    borderRadius: '50%'
  },
  sectionNear:{
    // marginLeft:scaleSize(36),
    // marginRight:scaleSize(36)
  },
  section: {
    // flex:1,
    paddingLeft: scaleSize(36),
    // flexWrap: 'wrap',
    justifyContent: "space-between"
  },
  section2: {
    flex: 1,
    justifyContent: "space-between"
  },
  row: {
    flexDirection: "row"
  },
  welcome: {
    fontSize: 14,
    color: "#333"
  },
  welcome1: {
    marginLeft: scaleSize(30),
    fontSize: 11,
    color: "#333"
  },
  core: {
    fontSize: 11,
    color: "#cecece",
    paddingRight: scaleSize(30)
  },
  sign: {
    flexDirection: "row",
    marginTop: scaleSize(36),
    width: deviceWidth * 0.9,
    marginLeft: scaleSize(36),
    justifyContent: "space-between"
  },
  search: {
    marginBottom: scaleSize(20),
    flexDirection: "row",
    flex: 1, // 类似于android中的layout_weight,设置为1即自动拉伸填充
    justifyContent: "space-between",
    alignItems: "center"
  },
  searchBox: {
    marginBottom: scaleSize(10),
    flexDirection: "row",
    flex: 1, // 类似于android中的layout_weight,设置为1即自动拉伸填充
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: scaleSize(6),
    borderLeftColor: "#43b8fe"
  },
  serverBox: {
    marginTop: scaleSize(30),
    marginLeft: scaleSize(36),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: scaleSize(6),
    borderLeftColor: "#43b8fe"
  },
  hospitalList: {
    position: "absolute",
    top: scaleSize(120),
    left: scaleSize(50),
    borderRadius: scaleSize(20)
  },
  mineList: {
    flexDirection: "row",
    marginTop: scaleSize(36),
    width: deviceWidth * 0.8,
    marginLeft: scaleSize(36),
    height: deviceHeight * 0.14,
    backgroundColor: "#fff",
    borderRadius: scaleSize(20)
  },
  navList: {
    flexDirection: "row",
    marginTop: scaleSize(150),
    width: deviceWidth * 0.95,
    marginLeft: scaleSize(36)
  },
  title: {
    fontSize: 14,
    color: "#333",
    marginLeft: scaleSize(12)
  }
};
