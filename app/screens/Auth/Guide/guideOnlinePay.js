/**
 * 4.引导页-在线缴费
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  Image,
  View,
  FlatList
} from "react-native"
import { Header, Button, Left, Right, Icon, Body, Title } from "native-base"
import GuidePage from "./guidePage"
export default class guideOnlinePay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      GuidePage: [
        {
          title: "在线缴费",
          imgUrl: require("../../../../assets/image/guide2.png"),
          bgColor: "#fff",
          text1: "智能便捷",
          text2: "在线支付"
        }
      ]
    }
  }
  render() {
    return (
      <View style={pageStyle.section}>
        <View style={bodyStyle.section}>
          <FlatList
            contentContainerStyle={doctorListStyle.section}
            data={this.state.GuidePage}
            renderItem={this.GuidePage}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={doctorListStyle.hospitalList1}>
            <View style={doctorListStyle.row}>
              <View style={doctorListStyle.redio} />
              <View style={doctorListStyle.redio2} />
              <View style={doctorListStyle.redio} />
            </View>
          </View>
        </View>
      </View>
    )
  }
  GuidePage({ item }) {
    return (
      <GuidePage
        title={item.title}
        imgUrl={item.imgUrl}
        text1={item.text1}
        bgColor={item.bgColor}
        text2={item.text2}
      />
    )
  }
}
const pageStyle = StyleSheet.create({
  section: {
    backgroundColor: "#fff",
    height: "100%"
  }
})
const bodyStyle = StyleSheet.create({
  section: {
    // paddingLeft: 20,
    // paddingRight: 20,
    marginTop: 30
  }
})
const doctorListStyle = StyleSheet.create({
  section: {
    // flex:1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  row: {
    flexDirection: "row",
    justifyContent: "center"
  },
  hospitalList: {
    marginTop: 28,
    width: Dimensions.get("window").width * 0.9,
    marginLeft: 18,
    paddingBottom: 17,
    borderRadius: 10
  },
  hospitalList1: {
    marginTop: 28,
    marginLeft: 18
  },

  redio: {
    borderRadius: 4,
    width: 8,
    height: 8,
    backgroundColor: "#b0dafc",
    marginLeft: 12
  },
  redio2: {
    borderRadius: 6,
    width: 18,
    height: 8,
    backgroundColor: "#68c6fb",
    marginLeft: 12
  },
  title: {
    fontSize: 32,
    color: "#333"
  },
  text: {
    fontSize: 16,
    color: "#36a7ff"
  },

  login: {
    // color: '#fff',
    textAlign: "center",
    fontSize: 18,
    marginLeft: Dimensions.get("window").width * 0.13
  }
})
