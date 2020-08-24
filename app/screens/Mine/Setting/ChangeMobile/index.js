/**
 * 4.修改手机号码
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
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
import { modifyMobile } from '../../../../actions/user'
import { GetVerificationCodeLogin } from '../../../../actions/auth'

class Counter extends Component {
    static propTypes = {
        modifyMobile: PropTypes.func.isRequired,
        GetVerificationCodeLogin: PropTypes.func.isRequired,
    }
    static defaultProps = {

    }
    constructor(props) {
        super(props)

        this.state = {
            captcha: 0,
            new_mobile: 0,


        }
    }

    modifyMobile() {
        this.props.modifyMobile([
            { name: 'captcha', data: this.state.captcha },
            { name: 'new_mobile', data: this.state.new_mobile },
        ])
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
                        <Title style={{ color: "#000" }}>修改手机号码</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>
                    <View style={styles.hospitalList} />
                    <View style={styles.hospitalList}>
                        <View style={styles.searchBox}>
                            <TextInput
                                keyboardType="number-pad"
                                placeholder="请输入新的手机号码"
                                underlineColorAndroid="transparent"
                                onChangeText={new_mobile => this.setState({ new_mobile })}
                                // value={this.state.new_mobile}
                                style={styles.inputText}
                            />

                            <CountDownButton
                                timerTitle={'获取验证码'}
                                value={this.state.new_mobile}
                                enable={isPhoneNumber(this.state.new_mobile) ? true : false}
                                onClick={(shouldStartCounting) => {
                                    this.props.GetVerificationCodeLogin(this.state.new_mobile, shouldStartCounting)
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
                                onChangeText={captcha => this.setState({ captcha })}
                            />
                        </View>
                    </View>

                    <View style={styles.hospitalList} />
                    <View style={{ marginTop: 40 }}>
                        <TouchableOpacity transparent onPress={() => { this.modifyMobile() }}>
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
    // mobile: state.auth.mobile,
})

export default connect(mapStateToProps, { modifyMobile, GetVerificationCodeLogin })(Counter)
