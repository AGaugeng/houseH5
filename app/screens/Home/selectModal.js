/**
 * 2.中部弹出框
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import { StyleSheet, View} from "react-native"
import {
  deviceWidth,
  deviceHeight
} from "../ScreenUtil"
export default class myModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View style={styles.mian}>
        <View style={[styles.container, { height:this.props.HEIGHT}]}>
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
    backgroundColor: "rgba(0,0,0,0.6)",
    // position: "relative"
  },

  container: {
    width: deviceWidth,
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    left: 0,
  },
  children: {
    // marginTop: scaleSize(40),
    // paddingLeft: scaleSize(20)
  }
});
