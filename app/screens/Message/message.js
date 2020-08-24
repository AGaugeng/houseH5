/**
 * 2.消息
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native"
import { Button } from "native-base"
import { scaleSize } from "../ScreenUtil"
import styles from "./styles"
export default class message extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <TouchableOpacity
        underlayColor="transparent"
        onPress={() => this.props.messageNav()}
      >
        <View style={styles.hospitalList}>
          <View>
            <Image
              source={this.props.imgUrl}
              style={{ width: scaleSize(108), height: scaleSize(108) }}
            />
          </View>
          <View style={styles.hospital}>
            <View style={styles.spaceBetween}>
              <Text style={styles.hospitalTitle}>{this.props.title}</Text>
              <Text style={styles.grade}>{this.props.date}</Text>
            </View>
            <View style={[styles.spaceBetween, { marginTop: scaleSize(20) }]}>
              <Text style={styles.grade} >{this.props.content}</Text>
              {this.props.status === '0' && <Button style={styles.button} full danger>
                <Text style={styles.note}>1</Text>
              </Button>}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
