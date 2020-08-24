/*
 * @Author: Song
 * @Date: 2018-10-10 09:27:50
 * @LastEditors: Song
 * @LastEditTime: 2018-12-12 09:51:36
 * @Description:微信登录
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
  Body,
  Title
} from "native-base"
import PropTypes from "prop-types"
import { scaleSize, deviceWidth, isWeixin } from "../../ScreenUtil" //自适配大小
import styles from "./styles"
import { UpdateAuthMobile, UpdateAuthUsername, UpdateAuthPassword, AuthSubmitLogin, UpdateAuthType, GetVerificationCodeLogin } from '../../../actions/auth'
import { incrementAction, decrementAction } from "../../../actions/counter"
import { Login, WeChatLogin, UpdateWechatCode, UpdateWechatState } from "../../../actions/auth"
import { connect } from "react-redux"
import { WxBindAccount } from "../../../actions/wechat"
import CountDownButton from '../../../tool/CountDownButton'
import { isPhoneNumber } from '../../../tool/verify'
class Counter extends Component {
  static propTypes = {
    WxBindAccount: PropTypes.func.isRequired,
    WeChatLogin: PropTypes.func.isRequired,
    Login: PropTypes.func.isRequired,
    userinfo: PropTypes.object.isRequired,
    AuthSubmitLogin: PropTypes.func.isRequired,
    UpdateAuthType: PropTypes.func.isRequired,
    GetVerificationCodeLogin: PropTypes.func.isRequired,
    mobile: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired
  };
  static defaultProps = {
    userinfo: {},
    mobile: '',
    type: 0
  };
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      captcha: '',
      username: '',
      code: 0,
      state: ''

    }
    //alert(JSON.stringify(props))
  }

  // getQueryVariable(variable) {
  //   var query = window.location.search.substring(1);
  //   var vars = query.split("&");
  //   for (var i = 0; i < vars.length; i++) {
  //     var pair = vars[i].split("=");
  //     if (pair[0] == variable) { return pair[1]; }
  //   }
  //   return (false);
  // }
  // componentDidMount() {
  //   let code = this.getQueryVariable('code')
  //   let state = this.getQueryVariable('state')
  //   // this.setState({ code })
  //   // this.setState({ state })

  //   setTimeout(() => {
  //     this.props.WeChatLogin([
  //       { name: 'code', data: code },
  //       { name: 'state', data: state },
  //     ])
  //   }, 200);
  // }



  render() {
    return (
      <Container View style={styles.container}>
        <Header style={{ backgroundColor: "#fff" }}>
          <Left>
          </Left>
          <Body>
            <Title />
          </Body>
          <Right>
            <Button transparent>
              <Text />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.hospitalList}>
            <View>
              <Text style={styles.coreLogin}>微信绑定</Text>
            </View>
          </View>
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

              {this.props.type === 1 &&
                <CountDownButton
                  timerTitle={'获取验证码'}
                  value={this.props.mobile}
                  enable={isPhoneNumber(this.props.mobile) ? true : false}
                  onClick={(shouldStartCounting) => {
                    this.props.GetVerificationCodeLogin(this.props.mobile, shouldStartCounting)
                  }}
                  timerEnd={() => {

                  }} />
              }
            </View>
          </View>
          {this.props.type === 0 ?
            <View style={styles.hospitalList}>
              <View style={styles.searchBox}>
                <TextInput
                  secureTextEntry={true}
                  keyboardType="web-search"
                  placeholder="请输入您的密码"
                  underlineColorAndroid="transparent"
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                  style={styles.inputText}
                />
                <Button
                  transparent
                  dark={true}
                  onPress={() => {
                    this.props.navigation.navigate("RetrievePassword");
                  }}
                >
                  <Text style={styles.core}>忘记密码？</Text>
                </Button>
              </View>
            </View>

            :
            <View style={styles.hospitalList}>
              <View style={styles.searchBox}>
                <TextInput
                  keyboardType='number-pad'
                  placeholder='请输入手机短信验证码'
                  underlineColorAndroid="transparent"
                  style={styles.inputText}
                  onChangeText={captcha => this.setState({ captcha })}
                  value={this.state.captcha}
                />
              </View>
            </View>
          }

          <View style={{ marginTop: scaleSize(36) }}>
            <TouchableOpacity transparent onPress={() => this.props.WxBindAccount(this.state.password, this.state.captcha)} >
              <button
                transparent
                className="mine"
                style={styles.bgColor}

              >
                <Text style={styles.login}>登陆</Text>
              </button>
            </TouchableOpacity>
          </View>
          <View style={styles.sign}>
            <View>
              <Button
                transparent
                onPress={() => {
                  this.props.type === 0 ? this.props.UpdateAuthType(1) : this.props.UpdateAuthType(0)
                  // this.props.navigation.navigate("CodeLogin")
                }}
              >
                <Text style={styles.core}>{this.props.type === 0 ? '手机号码登录' : '用户名登录'}</Text>
              </Button>
            </View>
            <View>
              <Button
                transparent
                onPress={() => {
                  if (isWeixin()) {
                    this.props.navigation.navigate("Registration")
                  } else {
                    this.props.navigation.navigate("AppRegistr")
                  }

                }}
              >
                <Text style={styles.core}>注册</Text>
              </Button>
            </View>
          </View>
          <View style={styles.hospitalList}>
            <View>
              {/* <Text style={styles.other}>其他方式登陆</Text> */}
            </View>
          </View>
          <View style={styles.otherLogin}>
            <View>
              {/* <Image
                source={require("../../../assets/login/wx@2x.png")}
                style={{ width: scaleSize(60), height: scaleSize(60) }}
              />
            </View>
            <View>
              <Image
                source={require("../../../assets/login/qq@2x.png")}
                style={{ width: scaleSize(60), height: scaleSize(60) }}
              /> */}
            </View>
          </View>
        </Content>
        <Image
          source={require("../../../assets/login/bg@2x.png")}
          style={{ width: deviceWidth, height: scaleSize(250), position: 'absolute', bottom: 0, left: 0 }}
        />

      </Container>
    );
  }
}
const mapStateToProps = state => ({
  nav: state.nav,
  counter: state.counter.counter,
  mobile: state.auth.mobile,
  openid: state.auth.openid,
  type: state.auth.type,
  username: state.auth.username,
  wxcode: state.auth.wxcode,
  wxstate: state.auth.wxstate
});

const mapDispatchToProps = {
  incrementAction,
  decrementAction,
  Login,
  UpdateAuthMobile,
  UpdateAuthPassword,
  AuthSubmitLogin,
  UpdateAuthType,
  GetVerificationCodeLogin,
  UpdateAuthUsername,
  WeChatLogin,
  UpdateWechatCode,
  UpdateWechatState,
  WxBindAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
