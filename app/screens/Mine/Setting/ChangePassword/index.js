/*
 * @Author: Song
 * @Date: 2018-10-25 15:37:36
 * @LastEditors: Song
 * @LastEditTime: 2018-12-14 12:08:05
 * @Description: 修改密码
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
import { isPhoneNumber } from '../../../../tool/verify'
import CountDownButton from '../../../../tool/CountDownButton'
import { vcodeChangePwd } from '../../../../actions/user'
import { GetVerificationCodeLogin } from '../../../../actions/auth'

class Counter extends Component {
    static propTypes = {
        vcodeChangePwd: PropTypes.func.isRequired,

    }
    static defaultProps = {

    }
    constructor(props) {
        super(props)

        this.state = {
            code: 0,
            password: 0


        }
    }

    vcodeChangePwd() {
        this.props.vcodeChangePwd([
            { name: 'code', data: this.state.code },
            { name: 'password', data: this.state.password }
        ])
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
                        <Title style={{ color: "#000" }}>修改密码</Title>
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
                                keyboardType="web-search"
                                placeholder="请输入手机短信验证码"
                                underlineColorAndroid="transparent"
                                style={styles.inputText}
                                onChangeText={code => this.setState({ code })}
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
                        <TouchableOpacity transparent onPress={() => { this.vcodeChangePwd() }}>
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
    userinfo: state.user.info,
})

export default connect(mapStateToProps, { vcodeChangePwd, GetVerificationCodeLogin })(Counter)
