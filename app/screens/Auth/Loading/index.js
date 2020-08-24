import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Image,
  Animated,
  Easing,
  Text
} from "react-native"
import {
  scaleSize, isWeixin
} from "../../ScreenUtil" //自适配大小
/*组件必须export default修饰*/
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { NavigationActions } from 'react-navigation/lib/react-navigation.js'
import { UpdateWechatCode, UpdateWechatState } from "../../../actions/auth"
import { fetchLinking } from "../../../network";
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Login' }),
  ],
});
const resetAction2 = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'OldLogin' }),
  ],
});
class Counter extends Component {
  static propTypes = {
    UpdateWechatCode: PropTypes.func.isRequired,
    UpdateWechatState: PropTypes.func.isRequired,
    wxstate: PropTypes.string.isRequired,
    wxcode: PropTypes.number.isRequired
  };
  static defaultProps = {
    wxstate: '',
    wxcode: 0
  };
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0) // 透明度初始值设为0
    };
  }
  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
  }
 
  componentDidMount() {
    // componentDidMount() {
 
    this.setState({ unLoad: true })



    // }
    Animated.timing(
      // 随时间变化而执行的动画类型
      this.state.fadeAnim, // 动画中的变量值
      {
        toValue: 1, // 透明度最终变为1，即完全不透明
        duration: 2000,
        easing: Easing.bezier(0.15, 0.73, 0.37, 1.2) //缓动函数
      }
    ).start();
    // 开始执行动画
    // let a = this.getQueryVariable('code')
    let state = this.getQueryVariable('state')
    this.props.UpdateWechatState(state)
    setTimeout(() => {
      if (isWeixin()) {
        this.props.navigation.dispatch(resetAction);
      } else {
        this.props.navigation.dispatch(resetAction2);
      }
    }, 2000);
  }

  render() {

    return (
      <View style={styles.container}>
        <Animated.View
          ref="view"
          style={[styles.content, { opacity: this.state.fadeAnim }]}
        >
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require("../../../assets/loading/LOGO@2x.png")}
              style={{ width: scaleSize(120), height: scaleSize(120) }}
            />
            <View style={{ marginLeft: scaleSize(39) }}>
              <Text style={{ color: '#e64e37', fontWeight: 'bold', fontSize: 18 }}>房长官</Text>
              <Text style={{ color: '#000', fontSize: 14 }}>共享房产资源平台</Text>
            </View>
          </View>

        </Animated.View>
        <Text style={{ color: '#999', fontSize: 14, marginTop: scaleSize(557) }}>copyright ©2018 房长官 版权所有</Text>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    justifyContent: "center"
    // backgroundColor: 'yellow',
  },

});

const mapStateToProps = state => ({
  wxcode: state.auth.wxcode,
  wxstate: state.auth.wxstate
});

const mapDispatchToProps = {
  UpdateWechatCode,
  UpdateWechatState
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);