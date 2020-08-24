/**
 * 1.就诊记录
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from "react-native"
import { scaleSize, deviceWidth } from "../ScreenUtil"
export default class tabOne extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={() => {
            this.props.myNav();
          }}
        >
          <View style={styles.hospitalList}>

            <View style={{

              marginTop: scaleSize(30),
              marginLeft: scaleSize(30),
              marginRight: scaleSize(30),
              borderBottomWidth: scaleSize(1),
              borderBottomColor: '#eee',
              flexDirection: "row",
              alignItems: 'center',
            }}>
              <Image
                source={this.props.imgUrl}
                style={{ width: scaleSize(180), height: scaleSize(140), borderRadius: scaleSize(4) }}
              />
              <View style={{
                paddingLeft: scaleSize(36),
                width: deviceWidth * 0.65
              }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}>
                  <Text style={{
                    color: "#000",
                    fontSize: 14
                  }}>{this.props.name}</Text>

                </View>
                <Text style={{
                  marginTop: scaleSize(8),
                  color: '#666',
                  fontSize: 14
                }}>
                  {this.props.grade}
                  &nbsp;&nbsp;&nbsp;
            {this.props.type}
                </Text>
                <View style={{ backgroundColor: '#F4F4F4', width: scaleSize(80), height: scaleSize(36), borderRadius: scaleSize(6), marginTop: scaleSize(8) }}>
                  <Text style={{ color: '#6EADFB', padding: scaleSize(8), fontSize: 14, lineHeight: scaleSize(20), alignSelf: 'center' }}>{this.props.time}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{
                    marginTop: scaleSize(8),
                    fontSize: 14,
                    color: '#d6112d'
                  }}>{this.props.position}</Text>
                  <Text style={{
                    marginTop: scaleSize(8),
                    fontSize: 14,
                    marginBottom: scaleSize(28),
                    color: '#666'
                  }}>
                    &nbsp;&nbsp;&nbsp;{this.props.distance}
                  </Text>
                </View>
              </View>
            </View>

          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  hospitalList: {
    backgroundColor: "#fff"
  },
  container: {

  },
  head: {
    marginLeft: scaleSize(36),
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: deviceWidth * 0.8
  },
  title: {
    fontSize: 18,
    color: "#000",
    marginLeft: scaleSize(23),
    lineHeight: scaleSize(70)
  },
  // bg: {
  //   width: scaleSize(750),
  //   height: scaleSize(20),
  //   backgroundColor: '#F4F4F4'
  // },
  status: {
    fontSize: 16,
    color: "#e64e37",
    lineHeight: scaleSize(70)
  },
  doctor: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: scaleSize(36),
    width: deviceWidth * 0.85
  },

  grade: {
    marginTop: scaleSize(36),
    fontSize: 14
  },
  hospital: {
    paddingLeft: scaleSize(36),
    width: deviceWidth * 0.4
  }
});
