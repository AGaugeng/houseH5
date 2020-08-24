/**
 * 推荐人管理
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, View, TouchableOpacity } from "react-native"
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Left,
    Input,
    Right,
    Body,
    Text,
    ListItem
} from "native-base"
import styles from "./styles"
import { scaleSize, deviceWidth } from "../../ScreenUtil"

const wxpay = require("../../../assets/mine/wxpay/wx@2x.png")
class Counter extends Component {
    static propTypes = {

        userinfo: PropTypes.object.isRequired,

    }
    static defaultProps = {
        userinfo: {},
    }
    constructor(props) {
        super(props)
        this.state = {
            amount: 0,
            password: ''
        }

    }

    render() {
        return (
            <Container >
                <Header style={{ borderBottomColor: '#fff', borderBottomWidth: scaleSize(1) }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>提现</Title>
                    </Body>
                    <Right />

                </Header>
                <Content style={styles.withBg}>
                    <ListItem style={[styles.share, { marginTop: scaleSize(25) }]} icon>
                        <Left style={{ borderBottomColor: '#fff' }}>
                            <Text style={{ fontSize: 14, color: '#000' }}>可提现金额</Text>
                        </Left>
                        <Body style={{ borderBottomColor: '#fff' }} >
                            <Text style={{ fontSize: 14, color: '#000' }}>{this.props.userinfo.balance}元</Text>
                        </Body>
                    </ListItem>
                    <View style={styles.input} icon>
                        <Left style={{ borderBottomColor: '#fff' }}>
                            <Text style={{ fontSize: 14, color: '#000' }}>提现金额</Text>
                        </Left>
                        <Body style={{ borderBottomColor: '#fff' }} >
                            <Input
                                keyboardType="web-search"
                                placeholder="请输入提现金额"
                                underlineColorAndroid="transparent"
                                style={styles.inputText}
                                onChangeText={amount => this.setState({ amount })}
                            />
                        </Body>
                    </View>
                    <View style={styles.input} icon>
                        <Left style={{ borderBottomColor: '#fff' }}>
                            <Text style={{ fontSize: 14, color: '#000' }}>交易密码</Text>
                        </Left>
                        <Body style={{ borderBottomColor: '#fff' }} >
                            <Input
                                keyboardType="web-search"
                                secureTextEntry={true}
                                placeholder="请输入您的交易密码"
                                underlineColorAndroid="transparent"
                                style={styles.inputText}
                                onChangeText={password => this.setState({ password })}
                            />
                        </Body>
                    </View>
                    <ListItem icon style={{ marginTop: scaleSize(47), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left>
                            <Text style={{
                                color: '#666666',
                                marginLeft: scaleSize(14),
                                fontSize: 16
                            }}>提现账户</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', borderBottomColor: '#fff' }} />
                    </ListItem>
                    <ListItem style={[styles.share1]} icon>
                        <Left style={{ borderBottomColor: '#fff' }}>
                            <Image source={wxpay} style={styles.svg}></Image><Text style={{ fontSize: 14, color: '#333' }}>  微信账户</Text>
                        </Left>
                        <Right style={{ borderBottomColor: '#fff' }} >
                            <Text style={{ fontSize: 14, color: '#333' }}>****{`   `}<Icon style={{ fontSize: 20, color: "#999" }} name="ios-arrow-forward" /></Text>

                        </Right>
                    </ListItem>
                    <TouchableOpacity transparent onPress={() => {
                        // this.props.navigation.navigate('MemberJoin')
                    }}>
                        <button className="mine" style={{ width: scaleSize(577), marginLeft: deviceWidth / 2 - scaleSize(577) / 2, marginTop: scaleSize(158), height: scaleSize(80), borderRadius: scaleSize(40) }}>
                            <Text style={{ color: '#fff', fontSize: 14 }}>确认提现</Text>
                        </button>
                    </TouchableOpacity>
                </Content>
            </Container >
        );
    }
}
const mapStateToProps = state => ({
    userinfo: state.user.info,
})

export default connect(mapStateToProps, {})(Counter)
