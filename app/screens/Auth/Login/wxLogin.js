/*
 * @Author: Song
 * @Date: 2018-11-26 14:22:08
 * @LastEditors: Song
 * @LastEditTime: 2018-12-29 11:07:07
 * @Description: wecahet
 */

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
import PropTypes from "prop-types"
import { connect } from "react-redux"
/*组件必须export default修饰*/
import { Login, WeChatLogin, UpdateWechatCode, UpdateWechatState } from "../../../actions/auth"
import { fetchLinking, Config } from '../../../network'
class Counter extends Component {
    static propTypes = {
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
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0), // 透明度初始值设为0
            code: 0,
            state: ''
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
        Animated.timing(
            // 随时间变化而执行的动画类型
            this.state.fadeAnim, // 动画中的变量值
            {
                toValue: 1, // 透明度最终变为1，即完全不透明
                duration: 1500,
                easing: Easing.bezier(0.15, 0.73, 0.37, 1.2) //缓动函数
            }
        ).start();
        let code = this.getQueryVariable('code')
        let state = this.getQueryVariable('state')
        // this.setState({ code })
        // this.setState({ state })

        this.props.UpdateWechatCode(code)
        this.props.UpdateWechatState(state)
        
        setTimeout(() => {
            if (!this.props.wxcode) {
                fetchLinking(Config.API_URL + '/api/weixin/index')
            } else {
                setTimeout(() => {
                    this.props.WeChatLogin([
                        { name: 'code', data: code },
                        { name: 'state', data: state },
                    ])
                }, 200);
            }
        }, 200);


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
                            <Text style={{ color: '#000', alignSelf: 'center', fontSize: 18 }}>正在加载...</Text>

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
    openid: state.auth.openid,
    wxcode: state.auth.wxcode,
    wxstate: state.auth.wxstate
});

const mapDispatchToProps = {
    Login,
    WeChatLogin,
    UpdateWechatCode,
    UpdateWechatState
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
