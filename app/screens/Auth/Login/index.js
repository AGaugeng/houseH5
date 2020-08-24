/**
 * 4.密码登陆
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
  Icon,
  Button,
  Left,
  Right,
  Body,
  Spinner,
  Input,
  Title
} from "native-base"
import PropTypes from "prop-types"
import { scaleSize, deviceWidth, isWeixin } from "../../ScreenUtil" //自适配大小
import styles from "./styles"
import { Login, UpdateAuthMobile, UpdateAuthPassword, AuthSubmitLogin, UpdateAuthType, GetVerificationCodeLogin } from '../../../actions/auth'
import { incrementAction, decrementAction } from "../../../actions/counter"
import { UpdateLoginState } from "../../../actions/user"
import { connect } from "react-redux"
import CountDownButton from '../../../tool/CountDownButton'
import { isPhoneNumber } from '../../../tool/verify'
import { fetchLinking, Config } from '../../../network'
class Counter extends Component {
  static propTypes = {
    UpdateLoginState: PropTypes.func.isRequired,
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
    type: 0,
    islogin: false
  };
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      captcha: '',
      refreshing: false

    }
    //alert(JSON.stringify(props))
  }


  componentWillMount() {
    this.props.UpdateLoginState(false)
  }

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
              <Text style={styles.coreLogin}>{this.props.type === 0 ? '密码登陆' : '验证码登录'}</Text>
            </View>
          </View>
          <View style={styles.hospitalList}>
            <View style={styles.searchBox}>
              <Input
                keyboardType="number-pad"
                placeholder="请输入您的手机号"
                // underlineColorAndroid="transparent"
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
                <Input
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
                <Input
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
            {this.state.refreshing ?
              <Spinner color="#e64e37"  />
              : <TouchableOpacity transparent onPress={() => {
                this.setState({ refreshing: true })
                this.props.AuthSubmitLogin(this.state.password, this.state.captcha, () => this.setState({ refreshing: false }))
              }}>
                <button
                  transparent
                  className="mine"
                  style={styles.bgColor}

                >
                  <Text style={styles.login}>登陆</Text>
                </button>
              </TouchableOpacity>}
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
                <Text style={styles.core}>{this.props.type === 0 ? '验证码登录' : '密码登陆'}</Text>
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
          {isWeixin() &&
            <View>
              <View style={styles.hospitalList}>
                <View>
                  <Text style={styles.other}>其他方式登陆</Text>
                </View>
              </View>
              <View style={styles.otherLogin}>
                <View>
                  <TouchableOpacity transparent onPress={() =>
                    fetchLinking(Config.API_URL + '/api/weixin/index') //https://www.fzguan.com
                  }>
                    <Icon style={{ color: 'green', fontSize: 24 }} type="FontAwesome" name="weixin" />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity transparent onPress={() =>
                    fetchLinking(Config.API_URL + '/api/weixin/index')
                  }>
                    <Icon style={{ color: '#666', fontSize: 24 }} type="MaterialCommunityIcons" name="qqchat" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>}
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
  counter: state.counter.counter,
  mobile: state.auth.mobile,
  type: state.auth.type,
  islogin: state.user.islogin
});

const mapDispatchToProps = {
  incrementAction,
  decrementAction,
  Login,
  UpdateAuthMobile,
  UpdateAuthPassword,
  AuthSubmitLogin,
  UpdateAuthType,
  fetchLinking,
  GetVerificationCodeLogin,
  UpdateLoginState
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
