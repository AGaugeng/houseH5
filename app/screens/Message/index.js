/*
 * @Author: Song
 * @Date: 2018-11-22 17:10:16
 * @LastEditors: Song
 * @LastEditTime: 2018-12-19 10:08:02
 * @Description: IG牛逼
 */

import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ImageBackground, Image, TouchableOpacity, } from "react-native"
import {
  Header,
  Container,
  Content,
  Left,
  Button,
  Right,
  Text,
  Spinner,
  Body,
  Title
} from "native-base"
import {
  scaleSize,
  deviceHeight,
  toDate
} from "../ScreenUtil"
import { getMessagesData } from '../../actions/message'
import { getLogBalance } from '../../actions/log'
import styles from "./styles"
import View from "../../tool/View"
class Counter extends Component {
  static propTypes = {
    getMessagesData: PropTypes.func.isRequired,
    getLogBalance: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    pay: PropTypes.array.isRequired
  }
  static defaultProps = {
    messages: [],
    pay: [],
    count: 0

  }
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      limit: 20,
      status: 0
    }
  }


  componentWillMount() {
    let count = 0
    this.props.getLogBalance(
      [
        { name: 'page', data: this.state.page },
        { name: 'limit', data: this.state.limit },

      ]
    )
    this.props.getMessagesData(
      [
        { name: 'page', data: this.state.page },
        { name: 'limit', data: this.state.limit },
        { name: 'status', data: this.state.status },

      ]
    )

    //   this.props.messages.length > 0 &&
    //     this.props.messages.map((item, index) => {
    //       if (item.status === '0') {
    //         count++
    //       }
    //       this.props.UpdateMessagesCount(count)
    //     })

  }


  render() {
    // console.log(this.props.count)
    const pay = this.props.pay.length > 0 ? this.props.pay[0] : {}
    const message = this.props.messages.length > 0 ? this.props.messages[0] : {}

    return (
      <Container style={styles.section}>
        <Header style={{ backgroundColor: "#fff" }}>
          <Left>
            <Title style={{ color: "#000", marginLeft: scaleSize(20) }}>
              消息
            </Title>
          </Left>
          <Body />
          <Right />
        </Header>
        <Content>

          {(typeof this.props.messages === "object" && this.props.messages.length > 0) || (typeof this.props.pay === "object" && this.props.pay.length > 0) ?
            <View>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => this.props.navigation.navigate('InformMsg')}
              >
                {Object.keys(message).length > 0 && <View style={styles.hospitalList}>

                  <Image
                    source={require("../../assets/message/noti@3x.png")}
                    style={{ width: scaleSize(108), height: scaleSize(108) }}//[this.props.pay[0]
                  />

                  <View mdpl >
                    <View row push>
                      <Text style={[styles.payTitle, { width: typeof plus === 'object' ? scaleSize(270) : scaleSize(290) }]}>通知消息</Text>
                      <Text style={styles.grade}>{message.add_time}</Text>
                    </View>
                    <View row push smpt>
                      <Text style={[styles.grade, { width: scaleSize(460) }]} >{message.content}</Text>
                      {this.props.count > 0 && <Button style={styles.button} full danger>
                        <Text style={styles.note}>{this.props.count}</Text>
                      </Button>}

                    </View>
                  </View>
                </View>}
              </TouchableOpacity>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => this.props.navigation.navigate('PayMsg')}
              >
                {Object.keys(pay).length > 0 && <View row mdpt vcenter mdpl >

                  <Image
                    source={require("../../assets/message/pay@3x.png")}
                    style={{ width: scaleSize(108), height: scaleSize(108) }}//[this.props.pay[0]
                  />

                  <View mdpl  >
                    <View row push>
                      <Text style={styles.payTitle}>支付消息</Text>
                      <Text style={styles.grade}>{toDate(pay.time)}</Text>
                    </View>
                    <View row push smpt>
                      <Text style={[styles.grade, { width: typeof plus === 'object' ? scaleSize(460) : scaleSize(485) }]} >{pay.note}</Text>

                      <Text style={{ color: '#e64e37', fontSize: 14 }}>{(pay.type === '1' ? '+' : '-') + pay.amount}</Text>

                    </View>
                  </View>
                </View>}
              </TouchableOpacity>


            </View>
            :
            <View style={styles.nocollet}>
              <ImageBackground source={require("../../assets/message/noMsg@2x.png")} style={{
                width: scaleSize(102),
                height: scaleSize(117),
                marginTop: deviceHeight / 4,
                alignSelf: 'center',
              }} />
              <Text style={{ alignSelf: 'center', marginTop: scaleSize(36) }}>您还没有消息噢~！</Text>
            </View>

          }
        </Content>
      </Container>
    );
  }

}


const mapStateToProps = state => ({
  messages: state.message.messages,
  count: state.message.count,
  pay: state.balance.data,

})

export default connect(mapStateToProps, { getMessagesData, getLogBalance })(Counter)