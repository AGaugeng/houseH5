/**
 * 2.中部弹出框
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import {
  scaleSize,
  deviceWidth,
  deviceHeight
} from "../../ScreenUtil"
export default class myModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View style={styles.mian}>
        <View style={styles.container}>
          <View style={styles.children}>{this.props.children}</View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mian: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "relative"
  },

  container: {
    width: deviceWidth * 0.75,
    height: deviceHeight / 4,
    backgroundColor: "#fff",
    position: "absolute",
    top: deviceHeight / 2 - (deviceHeight /4) / 2,
    left: deviceWidth / 2 - (deviceWidth * 0.75) / 2,
    borderRadius: scaleSize(20)
  },
  children: {
    marginTop: scaleSize(40),
    paddingLeft: scaleSize(20)
  }
});
