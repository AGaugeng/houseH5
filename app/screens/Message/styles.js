
import {
  scaleSize,
  deviceHeight,
  deviceWidth,
} from "../ScreenUtil";


export default {
  container: {
    backgroundColor: "#FFF"
  },
  section: {
    backgroundColor: "#FFF"
  },
  mb: {
    marginBottom: 10
  },
  paySection: {
    backgroundColor: "#f4f4f4",
    height: deviceHeight
  },
  addImg: {
    // flex: 1,
    width: scaleSize(102),
    height: scaleSize(117),
    marginTop: deviceHeight / 4,
    alignSelf: 'center',
  },
  text: {
    color: '#999',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: scaleSize(37)
  },
  hospitalList: {
    flexDirection: "row",
    alignItems: 'center',
    width: deviceWidth * 0.9,
    marginLeft: scaleSize(36),
    paddingBottom: scaleSize(36),
    borderBottomWidth: scaleSize(2),
    borderColor: "#eff3f6"
  },
  pay: {
    flexDirection: "row",
    padding: scaleSize(36),
    width: deviceWidth * 0.8,
    // marginLeft: scaleSize(36),
    borderRadius: scaleSize(10),
    backgroundColor: "#fff",
    alignItems: 'center',
    alignSelf: 'center'

  },
  payTitle: {
    color: "#333",
    fontSize: 14,

  },


  row: {
    flexDirection: "row"
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  grade: {
    fontSize: 14,
    color: "#999"
    
  },

  button: {
    borderRadius: scaleSize(25),
    width: scaleSize(50),
    height: scaleSize(40)
  },
  hospital: {
    paddingLeft: scaleSize(36),
    // width: deviceWidth * 0.75
  },

  note: {
    // marginLeft: 10,
    fontSize: 14,
    color: "#fff",
    lineHeight: scaleSize(30)
  }
};
