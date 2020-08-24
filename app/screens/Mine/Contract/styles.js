import { scaleSize, deviceWidth, deviceHeight } from "../../ScreenUtil"; //自适配大小
export default {
  row: {
    flexDirection: "row"
  },
  hospitalList: {
    marginTop: scaleSize(36),
    width: deviceWidth * 0.9,
    marginLeft: scaleSize(36)
  },
  section: {
    height: "100%",
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 14,
    color: "#000",
    lineHeight: scaleSize(40)
  },

  content: {
    marginTop: scaleSize(20),
    borderRadius: scaleSize(20),
    backgroundColor: "#fff"
  },
  doctor: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderLeftWidth: scaleSize(4),
    borderLeftColor: "#62b9fd",
    paddingLeft: scaleSize(36),
    width: deviceWidth * 0.85
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingLeft: scaleSize(36),
    width: deviceWidth * 0.85
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
  totalMoney: {
    marginTop: scaleSize(40),
    marginBottom: scaleSize(40),
    fontSize: 11,
    color: "#000"
  },
  grade: {
    marginVertical: scaleSize(20),
    fontSize: 12,
    color: "#333"
  },
  date: {
    fontSize: 14,
    color: "#333"
  },

  login: {
    color: "#fff",
    textAlign: "center",

    marginLeft: deviceWidth * 0.2
  },
  mian: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "#fff",
    // position: "relative"
  },

  // container: {
  //   width: deviceWidth * 0.75,
  //   height: deviceHeight /2,
  //   backgroundColor: "#fff",
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   borderRadius: scaleSize(20)
  // },
  children: {
    marginTop: scaleSize(40),
    paddingLeft: scaleSize(20)
  }
};

