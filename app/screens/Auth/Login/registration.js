/**
 * 4.账号注册
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native"
import {
  Header,
  Container,
  Content,
  Button,
  Left,
  Right,
  CheckBox,
  Icon,
  Body,
  Title
} from "native-base"
import PropTypes from 'prop-types'
import styles from "./styles"
import { UpdateAuthMobile, GetVerificationCodeLogin, RegisterAccount, WxRegisterAccount } from '../../../actions/auth'
import { connect } from 'react-redux'
import CountDownButton from '../../../tool/CountDownButton'
import { isPhoneNumber } from '../../../tool/verify'
import { scaleSize, deviceWidth } from "../../ScreenUtil" //自适配大小
class Counter extends Component {
  static propTypes = {
    GetVerificationCodeReg: PropTypes.func.isRequired,
    mobile: PropTypes.string.isRequired
  }
  static defaultProps = {
    mobile: '',
    wxstate: ''
  }
  constructor(props) {
    super(props)
    this.state = {
      isTrue: false,
      captcha: '',
      password: '',
      confirmpassword: '',
      recommend_code: '',

    }
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
            <Title style={{ color: "#000" }}>注册账号</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.hospitalList}>
            <View style={styles.searchBox}>
              <TextInput
                keyboardType="number-pad"
                placeholder={!!this.props.mobile ? this.props.mobile : "请输入您的手机号"}
                style={styles.inputText}
                onChangeText={mobile => this.props.UpdateAuthMobile(mobile)}
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
                style={styles.inputText}
                onChangeText={captcha => this.setState({ captcha })}
                value={this.state.captcha}
              />
            </View>
          </View>
          {/* <View style={styles.hospitalList}>
            <View style={styles.searchBox}>
              <TextInput
                enable={true}
                keyboardType="number-pad"
                placeholder={!!this.props.wxstate ? this.props.wxstate : '没有邀请码（非必须）'}
                style={styles.inputText}
                // onChangeText={recommend_code => this.setState({ recommend_code })}
                value={!!this.props.wxstate ? this.props.wxstate : ''}
              />
            </View>
          </View> */}
          <View style={styles.hospitalList}>
            <View style={styles.searchBox}>
              <TextInput
                secureTextEntry={true}
                placeholderTextColor='#666'
                placeholder="请输入密码（最少6位，数字加字母）"
                underlineColorAndroid="transparent"
                style={styles.inputText}
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </View>
          </View>
          <View style={styles.hospitalList}>
            <View style={styles.searchBox}>
              <TextInput
                secureTextEntry={true}
                placeholderTextColor='#666'
                placeholder="确认输入密码（最少6位，数字加字母）"
                underlineColorAndroid="transparent"
                style={styles.inputText}
                onChangeText={confirmpassword => this.setState({ confirmpassword })}
                value={this.state.confirmpassword}
              />
            </View>
          </View>
          <View style={[styles.hospitalList, { alignItems: 'center' }]}>
            <CheckBox checked={this.state.isTrue} onPress={() => this.setState({ isTrue: !this.state.isTrue })} />

            <Text style={{ fontSize: 14, marginLeft: scaleSize(36) }}>同意
                 <TouchableOpacity transparent onPress={() => {
                this.props.navigation.navigate('RegProtocol', { type: 'registr' })
              }}>
                <Text style={{ color: '#6EADFB', fontSize: 14 }}>《用户注册协议》</Text>
              </TouchableOpacity>
            </Text>

          </View>
          <View style={{ marginTop: 50 }}>
            {this.state.isTrue ?
              // <Button
              // transparent
              // style={styles.bgColor}
              // onPress={() => this.props.RegisterAccount(this.state.password, this.state.confirmpassword, this.state.captcha, () => {
              //   this.props.navigation.navigate('Login')
              // })}>
              // <Text style={styles.login1}>立即注册</Text>
              // </Button>
              <TouchableOpacity transparent onPress={() => this.props.WxRegisterAccount(this.state.password, this.state.confirmpassword, this.state.captcha, this.props.wxstate)} >
                <button
                  transparent
                  className="mine"
                  style={styles.bgColor}

                >
                  <Text style={styles.login}>立即注册</Text>
                </button>
              </TouchableOpacity>
              :
              <Button
                disabled
                style={styles.nobgColor}
              >
                <Text style={styles.login1}>是否同意</Text>
              </Button>
            }
          </View>

        </Content>
        <Image
          source={require("../../../assets/login/bg@2x.png")}
          style={{ width: deviceWidth, height: scaleSize(250), position: 'absolute', bottom: 0, left: 0 }}
        />
      </Container >
    );
  }
}
const mapStateToProps = state => ({
  nav: state.nav,
  openid: state.auth.openid,
  counter: state.counter.counter,
  mobile: state.auth.mobile,
  type: state.auth.type,
  wxcode: state.auth.wxcode,
  wxstate: state.auth.wxstate
});

const mapDispatchToProps = {
  UpdateAuthMobile,
  GetVerificationCodeLogin,
  RegisterAccount,
  WxRegisterAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
