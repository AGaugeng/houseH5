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
import {
  ListItem,
  Left,
  Right,
  // View
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
        {/* <TouchableOpacity
          underlayColor="transparent"
          onPress={() => {
            this.props.myNav();
          }}
        > */}
        <View style={styles.hospitalList}>
          <View style={styles.head}>
            <View style={styles.row}>
              <Image
                source={this.props.imgSvg}
                style={{
                  width: scaleSize(48),
                  height: scaleSize(48),
                  marginTop: scaleSize(8)
                }}
              />
              <Text style={styles.title}>{this.props.title}</Text>
            </View>

            <Text style={styles.status}>{this.props.status}</Text>
          </View>
          <View style={{

            paddingTop: scaleSize(15),
            paddingBottom:scaleSize(15),
            marginLeft: scaleSize(60),
            marginRight: scaleSize(60),
            borderBottomWidth: scaleSize(1),
            borderBottomColor: '#eee',
            flexDirection: "row",
            alignItems: 'center'
          }}>
            <Image
              source={this.props.imgUrl}
              style={{ width: scaleSize(200), height: scaleSize(180), borderRadius: scaleSize(4) }}
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
                  fontSize: 16,
                  fontWeight: 'bold'
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
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {!!this.props.time ?
                  this.props.time.map((item, index) =>
                    <View key={index} style={{ backgroundColor: '#F4F4F4', height: scaleSize(36), marginRight: scaleSize(8), borderRadius: scaleSize(6), marginTop: scaleSize(8) }}>
                      <Text style={{ color: '#6EADFB', padding: scaleSize(8), fontSize: 14, lineHeight: scaleSize(20), textAlign: 'center' }}>{item}</Text>
                    </View>)
                  :
                  <View style={{ backgroundColor: '#fff', height: scaleSize(32), marginRight: scaleSize(8), borderRadius: scaleSize(4), marginTop: scaleSize(8) }}>

                  </View>

                }


              </View>
              <View style={{ flexDirection: "row", alignItems: 'center', marginTop: scaleSize(10) }}>
                {!!this.props.position && <Text style={{
                  fontSize: 18,
                  marginRight: scaleSize(20),
                  color: '#d6112d',
                  fontWeight: 'bold',
                }}>{this.props.position}
                  <Text style={{
                    fontSize: 12,
                  }}>万</Text>
                </Text>
                }

                <Text style={{
                  fontSize: 14,
                  color: '#FA935F',
                }}>
                  {this.props.distance}
                </Text>
              </View>
            </View>
          </View>
          <ListItem icon style={{ flexDirection: 'row', marginRight:scaleSize(30),justifyContent: 'space-between' }}>
            <Left />
            <Right style={{ borderBottomColor: '#fff' }}>
              {this.props.action1 && this.props.action2 !== '查看合同' &&
                <TouchableOpacity
                  onPress={() => {
                    this.props._release();
                  }}
                >
                  <View style={{ borderWidth: scaleSize(1), borderColor: "#ccc", width: scaleSize(130), height: scaleSize(48), borderRadius: scaleSize(8) }}>
                    <Text style={{ color: '#333', fontSize: 14, alignSelf: 'center', lineHeight: scaleSize(48) }}>{this.props.action1}</Text>
                  </View>
                </TouchableOpacity>
              }
              {this.props.action2 &&
                <TouchableOpacity
                  onPress={() => {
                    this.props._change();
                  }}>
                  <View style={{ borderWidth: scaleSize(1), borderColor: "#ccc", width: scaleSize(130), height: scaleSize(48), borderRadius: scaleSize(8), marginLeft: scaleSize(8) }}>
                    <Text style={{ color: '#333', fontSize: 14, alignSelf: 'center', lineHeight: scaleSize(48) }}>{this.props.action2}</Text>
                  </View>
                </TouchableOpacity>
              }
            </Right>
          </ListItem>
        </View>
        {/* </TouchableOpacity> */}
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
    marginLeft: scaleSize(60),
    marginRight: scaleSize(60),
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 18,
    color: "#000",
    marginLeft: scaleSize(23),
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
    fontSize: 14
  },
  hospital: {
    paddingLeft: scaleSize(36),
    width: deviceWidth * 0.4
  }
});
