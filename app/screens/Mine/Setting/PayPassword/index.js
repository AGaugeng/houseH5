/*
 * @Author: Song
 * @Date: 2018-11-25 16:50:56
 * @LastEditors: Song
 * @LastEditTime: 2019-01-02 09:31:25
 * @Description: 支付密码
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
import { ChangePayPwd } from '../../../../actions/user'
import { fetchLinking } from '../../../../network'
import { isPhoneNumber } from '../../../../tool/verify'
import CountDownButton from '../../../../tool/CountDownButton'
import { GetVerificationCodeLogin } from '../../../../actions/auth'
import Toast from '../../../../tool/toast'
class Counter extends Component {
    static propTypes = {
        ChangePayPwd: PropTypes.func.isRequired,
        GetVerificationCodeLogin: PropTypes.func.isRequired,
    }
    static defaultProps = {

    }
    constructor(props) {
        super(props)

        this.state = {

            old_pay_password: '',
            new_pay_password: '',
            confirm_pay_password: '',
            captcha: ''


        }
    }

    ChangePayPwd() {
        if (this.state.old_pay_password.length > 6 || this.state.new_pay_password.length > 6) {
            Toast.warning("限6位数字")
        } else if (!this.props.userinfo.pay_password && (this.state.confirm_pay_password !== this.state.new_pay_password)) {
            Toast.warning("密码不一致")
        } else if (!this.state.captcha) {
            Toast.warning("请输入验证码")
        } else {
            this.props.ChangePayPwd([
                { name: 'captcha', data: this.state.captcha },
                { name: 'old_pay_password', data: this.state.old_pay_password },
                { name: 'new_pay_password', data: this.state.new_pay_password }
            ], () => this.props.navigation.goBack())
        }

    }
    call() {
        var msg = "您真的确定要拨打吗？\n\n请确认！";
        if (window.confirm(msg) == true) {
            return true;
            // () => fetchLinking("tel: 0760-85288618")
        } else {
            return false;
        }
    }
    render() {
        const mobile = this.props.userinfo.mobile

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
                        <Title style={{ color: "#000" }}>支付密码</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>
                    <View style={styles.hospitalList} />
                    <View style={styles.hospitalList}>
                        <View style={styles.searchBox}>
                            <TextInput
                                keyboardType="number-pad"
                                enable={false}
                                // placeholder={this.props.mobile}
                                underlineColorAndroid="transparent"
                                // onChangeText={mobile => this.setState({ mobile })}
                                value={mobile}
                                style={styles.inputText}
                            />

                            <CountDownButton
                                timerTitle={'获取验证码'}
                                value={mobile}
                                enable={isPhoneNumber(mobile) ? true : false}
                                onClick={(shouldStartCounting) => {
                                    this.props.GetVerificationCodeLogin(mobile, shouldStartCounting)
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
                    {!!this.props.userinfo.pay_password && <View style={styles.hospitalList}>
                        <View style={styles.searchBox}>
                            <TextInput
                                secureTextEntry={true}
                                keyboardType="number-pad"
                                placeholder="请输入旧密码（限6位数字）"
                                underlineColorAndroid="transparent"
                                style={styles.inputText}
                                onChangeText={old_pay_password => this.setState({ old_pay_password })}
                            />
                            <Button
                                transparent
                                dark={true}
                                onPress={() => {
                                    Toast.warning("忘记支付密码需要联系客服修改")
                                    fetchLinking("tel: 0760-85288618")
                                }}

                            >
                                <Text style={styles.core}>忘记密码？</Text>
                            </Button>
                        </View>
                    </View>}
                    <View style={styles.hospitalList}>
                        <View style={styles.searchBox}>
                            <TextInput
                                secureTextEntry={true}
                                keyboardType="number-pad"
                                placeholder="请输入新密码（限6位数字）"
                                underlineColorAndroid="transparent"
                                style={styles.inputText}
                                onChangeText={new_pay_password => this.setState({ new_pay_password })}
                            />
                        </View>
                    </View>
                    {!this.props.userinfo.pay_password && < View style={styles.hospitalList}>
                        <View style={styles.searchBox}>
                            <TextInput
                                secureTextEntry={true}
                                keyboardType="number-pad"
                                placeholder="再次输入密码（确认）"
                                underlineColorAndroid="transparent"
                                style={styles.inputText}
                                onChangeText={confirm_pay_password => this.setState({ confirm_pay_password })}
                            />
                        </View>
                    </View>}
                    <View style={styles.hospitalList} />
                    <View style={{ marginTop: 40 }}>
                        <TouchableOpacity transparent onPress={() => { this.ChangePayPwd() }} >
                            <button className="mine" style={styles.bgColor} >
                                <Text style={styles.login}>提交</Text>
                            </button>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container >
        );
    }
}
const mapStateToProps = state => ({
    userinfo: state.user.info,
})

export default connect(mapStateToProps, { GetVerificationCodeLogin, ChangePayPwd })(Counter)
