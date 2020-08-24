/**
 * 2.分享底部弹出框
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import {
  scaleSize,
  deviceWidth,
  deviceHeight
} from "../../../ScreenUtil";
export default class myModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    width: deviceWidth,
    height: deviceHeight / 3,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    borderRadius: scaleSize(20)
  },
  children: {
    marginTop: scaleSize(20),
    paddingLeft: scaleSize(20),
    paddingRight: scaleSize(20)
  }
});
