/**
 * 1.资讯详情
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import { StyleSheet, Text, View, Image, Dimensions } from "react-native"
import { setSpText, scaleSize, deviceWidth, deviceHeight } from "../../../ScreenUtil"
export default class component extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <View style={styles.date} />
        <View style={styles.hospitalList}>
          <View style={styles.head}>
            <View>
              <Image
                source={this.props.imgUrl}
                style={{
                  width:scaleSize(72),
                  height:scaleSize(72),
                  marginTop:scaleSize(-20),
                  marginRight:scaleSize(20),
                  borderRadius:scaleSize(36)
                }}
              />
            </View>
            <View style={styles.hospital}>
              <View style={styles.body}>
                <Text style={styles.title}>{this.props.name}</Text>
                <View style={styles.row}>
                  <Text style={styles.grade}>{this.props.mount}</Text>
                  <Image
                    source={this.props.like}
                    style={{
                      width:scaleSize(22),
                      height:scaleSize(20),
                      marginTop:scaleSize(10),
                      marginLeft: scaleSize(10),
                    }}
                  />
                </View>
              </View>
              <Text style={styles.title1}>{this.props.word}</Text>
              <Text style={styles.word1}>
                {this.props.date}
                &nbsp;&nbsp;回复
              </Text>

              <View
                style={{
                  width: deviceWidth * 0.7,
                  height: deviceWidth * 0.1,
                  borderRadius:scaleSize(10),
                  backgroundColor: "#eff3f6"
                }}
              >
                <Text style={styles.content}>{this.props.name}：{this.props.content}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  hospitalList: {
    marginTop: scaleSize(20),
    width: deviceWidth * 0.9,

    paddingBottom: scaleSize(36),
    borderRadius:scaleSize(20),
    backgroundColor: "#fff"
  },
  row: {
    flexDirection: "row"
  },
  body: {
    width: deviceWidth * 0.8,
    flexDirection: "row",
    paddingRight:scaleSize(36),
    justifyContent: "space-between"
  },
  head: {
    marginTop: scaleSize(30),

    flexDirection: "row",
    // justifyContent: 'space-between',

  },
  date: {
    marginTop:scaleSize(40),
    flexDirection: "row",
    justifyContent: "center"
  },
  title: {
    fontSize:setSpText(11),
    color: "#000"
  },
  title1: {
    fontSize:setSpText(11) ,
    color: "#000",
    marginTop:scaleSize(48),
  },
  word: {
    color: "#ccc",
    marginTop:scaleSize(28),
    fontSize:setSpText(11),
    marginLeft: scaleSize(8)
  },
  word1: {
    color: "#ccc",
    marginTop:scaleSize(20),
    fontSize: setSpText(11),
    marginLeft:scaleSize(8)
  },
  grade: {
    fontSize:setSpText(11),
    marginLeft:scaleSize(8)
  },
  content: {
    marginTop:scaleSize(28),
    paddingBottom:scaleSize(28),
    fontSize:setSpText(13),
    marginLeft:scaleSize(8),
    color: "#333",
    borderTopWidth:scaleSize(2),
    borderTopColor: "#eff3fe"
  },
  hospital: {
    // paddingLeft: 10,
    width: deviceWidth * 0.7
  }
})
