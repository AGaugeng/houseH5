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
    scaleSize
} from "../../ScreenUtil" //自适配大小
/*组件必须export default修饰*/
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { NavigationActions } from 'react-navigation/lib/react-navigation.js'
import { UpdateLoginState } from "../../../actions/user"
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'OldLogin' }),
    ],
});

class Counter extends Component {
    static propTypes = {
        UpdateLoginState: PropTypes.func.isRequired,
        islogin: PropTypes.bool.isRequired,
    };
    static defaultProps = {
        islogin: true,

    };
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0) // 透明度初始值设为0
        };
    }

    componentDidMount() {
        Animated.timing(
            // 随时间变化而执行的动画类型
            this.state.fadeAnim, // 动画中的变量值
            {
                toValue: 1, // 透明度最终变为1，即完全不透明
                duration: 2000,
                easing: Easing.bezier(0.15, 0.73, 0.37, 1.2) //缓动函数
            }
        ).start();
        this.props.UpdateLoginState(false)

        setTimeout(() => {
            this.props.navigation.dispatch(resetAction);
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
                            <Text style={{ color: '#e64e37', fontWeight: 'bold', fontSize: 16 }}>正在退出...</Text>
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
    islogin: state.user.islogin
});

const mapDispatchToProps = {
    UpdateLoginState
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);