import { deviceHeight, scaleSize, deviceWidth } from "../../ScreenUtil"
export default {
  container: {
    backgroundColor: "#FFF",

  },
  mb10: {
    marginBottom: 10
  },
  inputText: {
    padding: 0,
    marginLeft: -scaleSize(15),
    color: '#ccc',
    fontSize: 14,
    outline: 'none'
  },
  text: {
    height: 20, width: 100,
    borderWidth: 0,
    marginTop: scaleSize(20),
    marginBottom: scaleSize(30),
    color: '#333',
    backgroundColor: '#fff',
    fontSize: 14
  },
  bg: {
    width: deviceWidth,
    height: scaleSize(20),
    backgroundColor: '#F4F4F4'
  },
  TextBox: {
    padding: 0,
    width: scaleSize(690),
    height: scaleSize(160),
    color: '#ccc',
    fontSize: 14,
  },
  tab: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: scaleSize(25),
    marginRight: scaleSize(25),
    marginBottom: scaleSize(20),
    justifyContent: 'space-around'
  },
  img: {
    width: scaleSize(220),
    height: scaleSize(220),
    marginLeft: scaleSize(35)
  },
  intro: {
    height: deviceHeight * 0.1,
    // backgroundColor: 'transparent',
    fontSize: 14,
    textAlignVertical: "top",
    padding: 0,
    marginLeft: scaleSize(20),
    marginRight: scaleSize(20),
    marginTop: scaleSize(20)
  },
  imageContainer: {
    // flex: 1,
    width: deviceWidth,
    height: deviceHeight - deviceHeight/3  
  },

};
