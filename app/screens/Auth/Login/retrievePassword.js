/**
 * 4.找回密码
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, View, TextInput, TouchableOpacity } from "react-native"
import {
  Header,
  Container,
  Content,
  Button,
  Left,
  Right,
  Icon,
  Body,
  Title
} from "native-base"
import styles from "./styles"
import { isPhoneNumber } from '../../../tool/verify'
import CountDownButton from '../../../tool/CountDownButton'
import { GetVerificationCodeLogin, resetPassword, UpdateAuthMobile } from '../../../actions/auth'

class Counter extends Component {
  static propTypes = {
    resetPassword: PropTypes.func.isRequired,
    GetVerificationCodeLogin: PropTypes.func.isRequired,
    UpdateAuthMobile: PropTypes.func.isRequired,
  }
  static defaultProps = {

  }
  constructor(props) {
    super(props)

    this.state = {
      captcha: 0,
      mobile: 0,
      password: 0


    }
  }

  resetPassword() {
    this.props.resetPassword([
      { name: 'captcha', data: this.state.captcha },
      { name: 'mobile', data: this.props.mobile },
      { name: 'new_password', data: this.state.password }
    ])
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: "#fff" }}>
          <Left>
            <Button
              transparent
              dark={true}
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#000" }}>找回密码</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <View style={styles.hospitalList} />
          <View style={styles.hospitalList}>
            <View style={styles.searchBox}>
              <TextInput
                keyboardType="number-pad"
                placeholder="请输入您的手机号"
                underlineColorAndroid="transparent"
                onChangeText={mobile => this.props.UpdateAuthMobile(mobile)}
                value={this.props.mobile}
                style={styles.inputText}
              />

              <CountDownButton
                timerTitle={'获取验证码'}
                value={this.props.mobile}
                enable={isPhoneNumber(this.props.mobile) ? true : false}
                onClick={(shouldStartCounting) => {
                  this.props.GetVerificationCodeLogin(this.props.mobile, shouldStartCounting)
                }}
                timerEnd={() => {

                }} />

            </View>
          </View>
          <View style={styles.hospitalList}>
            <View style={styles.searchBox}>
              <TextInput
                keyboardType="number-pad"
                placeholder="请输入手机短信验证码"
                underlineColorAndroid="transparent"
                style={styles.inputText}
                onChangeText={captcha => this.setState({ captcha })}
              />
            </View>
          </View>
          <View style={styles.hospitalList}>
            <View style={styles.searchBox}>
              <TextInput
                secureTextEntry={true}
                keyboardType="web-search"
                placeholder="请输入密码（最少6位，数字加字母）"
                underlineColorAndroid="transparent"
                style={styles.inputText}
                onChangeText={password => this.setState({ password })}
              />
            </View>
          </View>
          <View style={styles.hospitalList} />
          <View style={{ marginTop: 40 }}>
            <TouchableOpacity transparent onPress={() => { this.resetPassword() }}>
              <button className="mine"
                style={styles.bgColor}
              >
                <Text style={styles.login}>提交</Text>
              </button>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  mobile: state.auth.mobile,
})

export default connect(mapStateToProps, { resetPassword, GetVerificationCodeLogin, UpdateAuthMobile })(Counter)
