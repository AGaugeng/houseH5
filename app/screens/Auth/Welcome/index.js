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
  scaleSize,
} from "../../ScreenUtil" //自适配大小
import {
  Spinner
} from "native-base"
/*组件必须export default修饰*/
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { searchResoldHouse, searchRentalHouse, searchNewhouse } from '../../../actions/house'
import { NavigationActions } from 'react-navigation/lib/react-navigation.js';
import { getAreaBrother,  } from '../../../actions/location'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home' }),
  ],
});

class Counter extends Component {
  static propTypes = {
    searchResoldHouse: PropTypes.func.isRequired,
    searchRentalHouse: PropTypes.func.isRequired,
    searchNewhouse: PropTypes.func.isRequired,
    resoldhouse: PropTypes.array.isRequired,
    newhouse: PropTypes.array.isRequired,
    rentalhouse: PropTypes.array.isRequired,

  }
  static defaultProps = {

    resoldhouse: [],
    newhouse: [],
    rentalhouse: [],
    token: {}

  }
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0) // 透明度初始值设为0
    };
  }
  componentWillMount() {
    this.props.getAreaBrother([
      { name: 'province', data: '广东省' },
      { name: 'city', data: '中山市' },
      { name: 'town', data: '古镇镇' }
    ])
    this.props.searchResoldHouse()
    this.props.searchNewhouse()
    this.props.searchRentalHouse()
  }
  componentDidMount() {
    Animated.timing(
      // 随时间变化而执行的动画类型
      this.state.fadeAnim, // 动画中的变量值
      {
        toValue: 1, // 透明度最终变为1，即完全不透明
        duration: 1500,
        easing: Easing.bezier(0.15, 0.73, 0.37, 1.2) //缓动函数
      }
    ).start();
    // 开始执行动画
    setTimeout(() => {

      // this.props.navigation.navigate('Login');
      this.props.navigation.dispatch(resetAction);
    }, 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          ref="view"
          style={[styles.content, { opacity: this.state.fadeAnim }]}
        >
          <View >
            <Image
              source={require("../../../assets/loading/LOGO@2x.png")}
              style={{ width: scaleSize(120), height: scaleSize(120), alignSelf: 'center' }}
            />
            <View >
              <Text style={{ color: '#e64e37', fontWeight: 'bold', alignSelf: 'center', fontSize: 18 }}>欢迎登陆</Text>

              <Spinner color='orange' />
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
  searchRentalHouse, searchNewhouse, searchResoldHouse, getAreaBrother,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);