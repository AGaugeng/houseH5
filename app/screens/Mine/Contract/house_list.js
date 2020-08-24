/*
 * @Author: Song
 * @Date: 2018-09-29 16:46:36
 * @LastEditors: Song
 * @LastEditTime: 2018-12-15 14:11:41
 * @Description: 合同管理
 */

import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native"
import {
  ListItem,
  Left,
  Right,
} from "native-base"
import { scaleSize, deviceWidth } from "../../ScreenUtil"
export default class tabOne extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={() => {
            this.props.myNav()
          }}
        >
          <View style={styles.hospitalList}>
            <View style={styles.head}>
              <View style={styles.row}>
                <Image
                  source={require('../../../assets/mine/qy@2x.png')}
                  style={{
                    width: scaleSize(28),
                    height: scaleSize(28),
                    marginTop: scaleSize(18),
                    marginRight: scaleSize(15)
                  }}
                />
                <Text style={styles.title}>  签约时间：{this.props.title}</Text>
              </View>

              <Text style={styles.status}> {this.props.status}</Text>
            </View>
            <View style={{
              marginTop: scaleSize(15),
              marginLeft: scaleSize(30),
              marginRight: scaleSize(30),
              borderBottomWidth: scaleSize(1),
              borderBottomColor: '#eee',
              flexDirection: "row",
              alignItems: 'center'
            }}>
              {/* <TouchableHighlight
                underlayColor="transparent"
                onPress={() => this.props.nearbyHospital()}
              > */}
              {/* <Image
                  source={this.props.imgUrl}
                  style={{ width: scaleSize(180), height: scaleSize(140), borderRadius: scaleSize(4) }}
                /> */}
              <Image
                // alt='房长官'
                style={{ width: scaleSize(180), height: scaleSize(160), borderRadius: scaleSize(4) }}
                source={this.props.imgUrl} />
              {/* </TouchableHighlight> */}
              <View style={{
                paddingLeft: scaleSize(36),
                marginTop: scaleSize(18),
                width: deviceWidth * 0.65
              }}>
                <View style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}>
                  <Text style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: 'bold'
                  }}>{this.props.name}</Text>

                </View>
                <Text style={{
                  marginTop: scaleSize(10),
                  color: '#666',
                  fontSize: 14
                }}>
                  {this.props.grade}
                  &nbsp;&nbsp;&nbsp;
            {this.props.type}
                </Text>
                {/* <View style={{ backgroundColor: '#F4F4F4', width: scaleSize(80), height: scaleSize(32), marginTop: scaleSize(8) }}>
                  <Text style={{ color: '#6EADFB', fontSize: 6, textAlign: 'center' }}>{this.props.time}</Text>
                </View> */}
                <View style={{ flexDirection: "row" }}>
                  <Text style={{
                    marginTop: scaleSize(30),
                    fontSize: 15,
                    color: '#d6112d'
                  }}>{this.props.position}</Text>
                  <Text style={{
                    marginTop: scaleSize(30),
                    fontSize: 14,
                    marginBottom: scaleSize(28),
                    color: '#333'
                  }}>
                    &nbsp;&nbsp;&nbsp;签约人：{this.props.distance}
                  </Text>
                </View>
              </View>
            </View>
            <ListItem onPress={() => {
              this.props.myNav()
            }} icon style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Left >
                <Text style={{ color: '#333', fontSize: 12, alignSelf: 'center', lineHeight: scaleSize(48) }}>{this.props.code}</Text>
              </Left>
              <Right style={{ borderBottomColor: '#fff' }}>
                <View style={{ borderWidth: scaleSize(1), borderColor: "#ccc", width: scaleSize(126), height: scaleSize(48), borderRadius: scaleSize(8) }}>
                  <Text style={{ color: '#333', fontSize: 12, alignSelf: 'center', lineHeight: scaleSize(48) }}>{this.props.action}</Text>
                </View>

              </Right>
            </ListItem>
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
    marginTop: scaleSize(24),
    backgroundColor: "#fff"
  },

  head: {
    marginLeft: scaleSize(36),
    marginRight: scaleSize(36),
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 14,
    color: "#000",
    lineHeight: scaleSize(70)
  },
  container: {
    marginTop: scaleSize(20)
  },
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
    fontSize: 12
  },
  hospital: {
    paddingLeft: scaleSize(36),
    width: deviceWidth * 0.4
  }
});
