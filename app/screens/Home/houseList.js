/**
 * 2.热门推荐
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
  TouchableHighlight,
  Image,
} from "react-native"
import {
  scaleSize,
  deviceWidth
} from "../ScreenUtil"
export default class HouseList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => this.props.houseList()}
      >
        <View style={styles.hospitalList}>

          <Image
            alt='房长官'
            source={this.props.imgUrl}
            style={{ width: scaleSize(200), height: scaleSize(160), marginRight: scaleSize(30), borderRadius: scaleSize(4) }}
          />

          <View style={styles.hospital}>
            <View style={styles.spaceBetween}>
              <Text style={styles.hospitalTitle}>{this.props.title}</Text>
              {this.props.action && <TouchableHighlight
                underlayColor="transparent"
                onPress={() => this.props.Register()}
              >
                <View style={{ backgroundColor: '#e64e37', width: scaleSize(98), height: scaleSize(48), borderRadius: scaleSize(24), marginTop: scaleSize(8), }}>
                  <Text style={{ color: '#fff', fontSize: 12, alignSelf: 'center', lineHeight: scaleSize(48) }}>{this.props.action}</Text>
                </View>
              </TouchableHighlight>}
            </View>
            <Text style={styles.grade1}>
              {this.props.grade}
              &nbsp;&nbsp;&nbsp;
            {this.props.type}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {!!this.props.time ?
                this.props.time.map((item, index) =>
                  <View key={index} style={{ backgroundColor: '#F4F4F4', height: scaleSize(36), marginRight: scaleSize(8), borderRadius: scaleSize(6), marginTop: scaleSize(8) }}>
                    <Text style={{ color: '#6EADFB', padding: scaleSize(8), fontSize: 14, lineHeight: scaleSize(20), alignSelf: 'center' }}>{item}</Text>
                  </View>)
                :
                <View style={{ backgroundColor: '#fff', height: scaleSize(32), marginRight: scaleSize(8), borderRadius: scaleSize(4), marginTop: scaleSize(8) }}>

                </View>

              }


            </View>
            <View style={[styles.row, { alignItems: 'center' }]}>
              {!!this.props.imgSvg && <Image
                source={this.props.imgSvg}
                style={{ width: scaleSize(28), height: scaleSize(32), marginRight: scaleSize(12), marginTop: scaleSize(-20) }}
              />}
              {!!this.props.position && <Text style={styles.grade2}>{this.props.position}<Text style={{
                fontSize: 12,
              }}>万</Text></Text>}
              {!!this.props.position1 && <Text style={styles.grade3}>{this.props.position1}</Text>}
              <Text style={styles.distance}>
                {this.props.distance}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  hospitalList: {
    flexDirection: "row",
    marginTop: scaleSize(8),
    paddingBottom: scaleSize(36),
    borderBottomWidth: scaleSize(2),
    alignItems: 'center',
    borderColor: "#fcfcfc",
    justifyContent: "space-between"
  },
  hospitalTitle: {
    color: "#000",
    fontSize: 15,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: "row"
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between"

  },
  distance: {
    marginTop: scaleSize(10),
    fontSize: 13,
    color: '#FA935F',

  },
  grade1: {
    marginTop: scaleSize(10),
    color: '#666',
    fontSize: 14
  },
  grade3: {
    marginTop: scaleSize(-20),
    fontSize: 14
  },
  grade2: {
    marginTop: scaleSize(10),
    fontSize: 18,
    color: '#d6112d',
    fontWeight: 'bold',
    marginRight: scaleSize(30)
  },
  logo: {
    marginTop: scaleSize(40),

    width: scaleSize(24),
    height: scaleSize(24)
  },

  button: {
    borderRadius: 10,
    width: deviceWidth * 0.16,

    height: 25
  },
  hospital: {
    // paddingLeft: scaleSize(36),
    paddingRight: scaleSize(20),
    width: deviceWidth * 0.65
  },
  card: {
    marginLeft: (deviceWidth - 36) * 0.1,
    marginTop: (deviceWidth - 36) * 0.1
  },
  text: {
    marginLeft: scaleSize(20),
    fontSize: 14,
    color: "#fff"
  },
  imgContainer: {
    paddingLeft: scaleSize(20)
    //  paddingRight: 5,
  },
  navImg: {
    width: scaleSize(96),
    height: scaleSize(96)
  }
})
