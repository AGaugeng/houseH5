/**
 * 4.设置
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
} from "react-native"
import {
  Header,
  Button,
  Left,
  Right,
  Content,
  Icon,
  List,
  Body,
  Title,
  Container
} from "native-base"
import { LogoutLogin } from "../../../actions/auth"
import { connect } from "react-redux"
import {
  scaleSize,
  deviceWidth,
  deviceHeight
} from "../../ScreenUtil";
import Toast from '../../../tool/toast'
class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: [
        {
          title: "个人资料",
          id: 1,
        },
        {
          title: "会员资料",
          id: 2,
        },
        {
          title: "修改密码",
          id: 3,
        },
        {
          title: "支付密码",
          id: 4,
        },
        {
          title: "修改号码",
          id: 5,

        },
        {
          title: "清除缓存",
          setting: typeof plus === 'object' && window.cacheSize,
          id: 6,

        },
        {
          title: "意见反馈",
          id: 7,
        },
        {
          title: "退出登录",
          id: 8,
        }
      ],
      modalVisible: false
    };
  }
  static propTypes = {
    LogoutLogin: PropTypes.func.isRequired
    // userinfo: PropTypes.object.isRequired
  };
  static defaultProps = {
    userinfo: {}
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }


  componentWillMount() {
    this.calculate()

  }

  calculate() {
    let k = 1024;
    if (typeof plus === 'object') {
      window.plus.cache.calculate(function (size) {
        console.log("应用缓存: " + size + " byte!");
        window.cacheSize = Math.floor(size / k / k) + 'MB'
      })
    }
  }
  render() {
    return (
      <Container
        style={{
          backgroundColor: "#fff",
          height: deviceHeight
        }}
      >
        <Header style={{ backgroundColor: "#e64e37" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#fff" }}>设置</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: '#f4f4f4' }}>
          <List
            contentContainerStyle={{ backgroundColor: '#fff', marginTop: scaleSize(45) }}
            dataArray={this.state.detail}
            renderRow={this.detail}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </Container>
    );
  }
  detail = item => {
    return (
      <View>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => {
            switch (item.title) {
              case "个人资料":
                this.props.navigation.navigate("Profile");
                break;
              case "会员资料":
                this.props.navigation.navigate("MemberProfileEdit");
                break;
              case "修改密码":
                this.props.navigation.navigate("ChangePassword");
                break;
              case "意见反馈":
                this.props.navigation.navigate("Feedback");
                break;
              case "支付密码":
                this.props.navigation.navigate("PayPassword");
                break;
              case "修改号码":
                this.props.navigation.navigate("ChangeMobile");
                break;
              case "清除缓存":
                if (typeof plus === 'object') {
                  window.plus.cache.clear(() => {
                    Toast.warning("清除缓存成功!")
                  })
                }
                break;
              case "退出登录":
                this.props.LogoutLogin();
                Toast.warning("您已退出!")
                // this.props.navigation.dispatch(resetAction);

                break;
              default: Toast.warning("你好!");
                break;
            }
          }}
        >
          {typeof plus !== 'object' && item.title === '清除缓存' ?
            <View /> : item.title === '退出登录' ?
              <View style={{ marginTop: scaleSize(36), marginBottom: scaleSize(36) }}>
                <Text style={{ fontSize: 14, color: '#f40', textAlign: 'center' }} > {item.title}</Text>
              </View>
              :
              < View style={[styles.sign, { borderBottomColor: (item.id === 2 || item.id === 5 || item.id === 7 || item.id === 8) ? '#fff' : "#eff3f6" }]}>
                <View>
                  <Text style={styles.welcome}>{item.title}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: scaleSize(36)
                  }}
                >
                  <Text style={styles.core}>{item.setting}</Text>
                  <Icon style={{ fontSize: 20, color: '#ccc' }} name="ios-arrow-forward" />
                </View>
              </View>}
        </TouchableHighlight>
        {(item.id === 2 || item.id === 5 || item.id === 7) && < View style={{ width: deviceWidth, height: scaleSize(36), backgroundColor: '#f4f4f4' }} />}
      </View >
    );
  };
}

const styles = StyleSheet.create({
  img: {
    width: scaleSize(100),
    height: scaleSize(100)
  },
  row: {
    flexDirection: "row"
  },
  welcome: {
    fontSize: 14,
    color: "#333"
  },
  core: {
    fontSize: 11,
    color: "#cecece",
    paddingRight: scaleSize(30)
  },
  sign: {
    flexDirection: "row",
    marginTop: scaleSize(36),
    width: deviceWidth * 0.9,
    marginLeft: scaleSize(36),
    justifyContent: "space-between",
    borderBottomWidth: scaleSize(2)
  },
  title: {
    fontSize: scaleSize(36),
    color: "#000",
    lineHeight: scaleSize(40)
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: scaleSize(36),
    width: deviceWidth * 0.85
  }
});
// export default (Counter)
const mapStateToProps = state => ({
  // userinfo: state.user.info
});
const mapDispatchToProps = {
  LogoutLogin
};
// export default Counter
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
