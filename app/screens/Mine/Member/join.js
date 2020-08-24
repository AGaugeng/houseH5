/**
 * 成为会员
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image } from "react-native"
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Left,
    Right,
    Body,
    Spinner,
    Text,
    Footer,
    ListItem,
} from "native-base"
import styles from "./styles"
import View from "../../View"
import { Grid, Col, Row } from "react-native-easy-grid"
import Password from 'react-mobile-password';
import { scaleSize, isWeixin } from "../../ScreenUtil"
import { saveMemberInfo, } from "../../../actions/user"
import { Config } from '../../../network'
import { getPaySign } from "../../../actions/wechat"
import Toast from '../../../tool/toast'
class Counter extends Component {
    static propTypes = {
        saveMemberInfo: PropTypes.func.isRequired,
        userinfo: PropTypes.object.isRequired,
        token: PropTypes.object.isRequired,
    }
    static defaultProps = {
        userinfo: {},
        token: {}
    }
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state || 0
        this.state = {
            id_card_img: [],
            isPassword: false,
            pay_type: 1,
            pay_password: '',
            params: params,
            refreshing: false
        }
    }
    componentWillMount() {
    }

    passwordPay(password) {
        this.setState({ isPassword: false })
        setTimeout(() => {
            this.props.getPaySign([
                { name: 'pay_type', data: this.state.pay_type },
                { name: 'vip_id', data: this.state.params.id },//
                { name: 'client', data: 1 },
                { name: 'pay_password', data: password },

            ], this.state.pay_type, () => {
                this.setState({ refreshing: false })
                this.props.navigation.navigate('Home')

            }, () => this.setState({ refreshing: false }))
        }, 200)


    }

    payMember(params) {

        if (this.state.pay_type === 1) {
            if (!this.props.userinfo.pay_password) {
                Toast.warning("请先设置支付密码!")
                this.props.navigation.navigate('PayPassword')
            } else {
                this.setState({ isPassword: true, refreshing: true })
            }

        } else {
            this.setState({ refreshing: true })
            this.props.getPaySign([
                { name: 'pay_type', data: this.state.pay_type },
                { name: 'vip_id', data: params.id },//
                { name: 'client', data: 1 },
                { name: 'openid', data: this.props.openid }
            ], this.state.pay_type, () => {
                this.props.navigation.navigate('Home')
                this.setState({ refreshing: false })
            }, () => this.setState({ refreshing: false }))
        }


    }


    appPayMember(params) {
        if (this.state.pay_type === 1) {
            if (!this.props.userinfo.pay_password) {
                Toast.warning("请先设置支付密码!")
                this.props.navigation.navigate('PayPassword')
            } else {
                this.setState({ isPassword: true, refreshing: true })
            }

        } else {
            this.setState({ refreshing: true })
            this.props.getPaySign([
                { name: 'pay_type', data: this.state.pay_type },
                { name: 'vip_id', data: params.id },//
                { name: 'client', data: 2 },
            ], this.state.pay_type, () => {
                this.props.navigation.navigate('Home')
                this.setState({ refreshing: false })
            }, () => this.setState({ refreshing: false }))
        }
    }


    render() {

        const params = this.state.params
        const user = this.props.userinfo
        const item = this.props.token
        // console.log(this.props.openid)
        return (
            <Container style={styles.joinContainer}>
                <Header >
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>成为会员</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <View mdpl mdpr style={{ marginTop: scaleSize(24), height: scaleSize(160), backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Image alt='房长官' style={styles.avatar} source={Config.API_URL + '/api/Public/get_user_avatar_img?token=' + item.token + '.' + item.uid + '&a=' + this.props.counter} />
                            <Text style={{ color: '#000', fontWeight: 'bold', alignSelf: 'center', fontSize: 18, marginLeft: scaleSize(28) }}>{user.nickname}</Text>
                        </Left>
                        <Right >
                            <Text style={{ color: '#999', fontSize: 16 }}>{user.level_name}</Text>
                        </Right>
                    </View >

                    <Grid style={{ backgroundColor: '#fff', marginTop: scaleSize(24) }}>
                        <Row>
                            <ListItem icon style={{ marginTop: scaleSize(36), backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Left>
                                    <Text style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 16
                                    }}>会员特权</Text>
                                </Left>
                                <Right style={{ borderBottomColor: '#fff' }} />
                            </ListItem>
                        </Row>
                        <Row style={{ margin: scaleSize(20), marginLeft: scaleSize(98) }}>
                            <Col style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon style={{ color: '#e64e37', fontSize: 15, marginRight: scaleSize(10) }} type="FontAwesome" name="bullseye" />
                                <Text style={{
                                    color: '#666',
                                    fontSize: 14,
                                }}>查看房源</Text>
                            </Col>
                            <Col style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon style={{ color: '#e64e37', fontSize: 15, marginRight: scaleSize(10) }} type="FontAwesome" name="bullseye" />
                                <Text style={{
                                    color: '#666',
                                    fontSize: 14,
                                }}>出售房源</Text>
                            </Col>
                            <Col style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon style={{ color: '#e64e37', fontSize: 15, marginRight: scaleSize(10) }} type="FontAwesome" name="bullseye" />
                                <Text style={{
                                    color: '#666',
                                    fontSize: 14,
                                }}>出租房源</Text>
                            </Col>

                        </Row>
                        <Row style={{ margin: scaleSize(20), marginLeft: scaleSize(98) }}>
                            <Col style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon style={{ color: '#e64e37', fontSize: 15, marginRight: scaleSize(10) }} type="FontAwesome" name="bullseye" />
                                <Text style={{
                                    color: '#666',
                                    fontSize: 14,
                                }}>管理房源</Text>
                            </Col>
                            <Col style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon style={{ color: '#e64e37', fontSize: 15, marginRight: scaleSize(10) }} type="FontAwesome" name="bullseye" />
                                <Text style={{
                                    color: '#666',
                                    fontSize: 14,
                                }}>跟进房源</Text>
                            </Col>
                            <Col style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon style={{ color: '#e64e37', fontSize: 15, marginRight: scaleSize(10) }} type="FontAwesome" name="bullseye" />
                                <Text style={{
                                    color: '#666',
                                    fontSize: 14,
                                }}>推荐邀请</Text>
                            </Col>

                        </Row>
                        <Row style={{ margin: scaleSize(20), marginBottom: scaleSize(50), marginLeft: scaleSize(98) }}>
                            <Col style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon style={{ color: '#e64e37', fontSize: 15, marginRight: scaleSize(10) }} type="FontAwesome" name="bullseye" />
                                <Text style={{
                                    color: '#666',
                                    fontSize: 14,
                                }}>余额提现</Text>
                            </Col>
                            <Col style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon style={{ color: '#e64e37', fontSize: 15, marginRight: scaleSize(10) }} type="FontAwesome" name="bullseye" />
                                <Text style={{
                                    color: '#666',
                                    fontSize: 14,
                                }}>票据管理</Text>
                            </Col>
                            <Col />

                        </Row>

                    </Grid>
                    <View mdpl mdpr style={{ marginTop: scaleSize(24), height: scaleSize(128), backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left>

                            <Text style={{
                                color: '#000',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>会员期限</Text>
                        </Left>
                        <Right>
                            <Text style={{
                                color: '#e64e37',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>{params.duration_time}天期限</Text>
                        </Right>
                    </View>

                    <View mdpl style={{ marginTop: scaleSize(24), height: scaleSize(128), backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left>

                            <Text style={{
                                color: '#000',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>支付方式</Text>
                        </Left>
                        <Right />

                    </View>

                    {(isWeixin() || typeof plus === 'object') && <View lgpl lgpr row push style={{ backgroundColor: '#fff' }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Image source={require("../../../assets/mine/vip/wxpay@3x.png")} style={{ width: scaleSize(36), height: scaleSize(36) }} />
                            <Text style={{
                                color: '#666',
                                fontSize: 14,
                                marginLeft: scaleSize(25)
                            }}>微信支付</Text>

                        </Left>
                        <Right>
                            <Button transparent onPress={() => this.setState({ pay_type: 2 })}>
                                <Image source={this.state.pay_type === 2 ? require("../../../assets/mine/vip/circle2@3x.png") : require("../../../assets/mine/vip/circle@3x.png")} style={{ width: scaleSize(34), height: scaleSize(34) }} />
                            </Button>
                        </Right>
                    </View>}
                    {typeof plus === 'object' && <View lgpl lgpr row push style={{ backgroundColor: '#fff' }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Image source={require("../../../assets/mine/vip/paypal@3x.png")} style={{ width: scaleSize(36), height: scaleSize(36) }} />
                            <Text style={{
                                color: '#666',
                                fontSize: 14,
                                marginLeft: scaleSize(25)
                            }}>支付宝支付</Text>

                        </Left>
                        <Right>
                            <Button transparent onPress={() => this.setState({ pay_type: 3 })}>
                                <Image source={this.state.pay_type === 3 ? require("../../../assets/mine/vip/circle2@3x.png") : require("../../../assets/mine/vip/circle@3x.png")} style={{ width: scaleSize(34), height: scaleSize(34) }} />
                            </Button>
                        </Right>
                    </View>}

                    <View lgpr lgpl row push style={{ backgroundColor: '#fff' }}>
                        <Left style={{ flexDirection: 'row' }}>
                            <Image source={require("../../../assets/message/pay@3x.png")} style={{ width: scaleSize(36), height: scaleSize(36) }} />
                            <Text style={{
                                color: '#666',
                                fontSize: 14,
                                marginLeft: scaleSize(25)
                            }}>余额支付</Text>

                        </Left>
                        <Right>
                            <Button transparent onPress={() => this.setState({ pay_type: 1 })}>
                                <Image source={this.state.pay_type === 1 ? require("../../../assets/mine/vip/circle2@3x.png") : require("../../../assets/mine/vip/circle@3x.png")} style={{ width: scaleSize(34), height: scaleSize(34) }} />
                            </Button>
                        </Right>
                    </View>

                    <View style={{ height: scaleSize(50), width: '100%', backgroundColor: '#fff' }}></View>

                </Content>
                <Footer style={{ height: scaleSize(118), justifyContent: 'space-between' }}>

                    <Text style={{ color: '#d6112d', marginLeft: scaleSize(30), lineHeight: scaleSize(118), marginRight: scaleSize(176), }}> <Text style={{ color: '#000' }}>总计：</Text>{params.price}元</Text>
                    {this.state.refreshing ?
                        <Spinner color="#e64e37" style={{ marginRight: scaleSize(100), paddingBottom: scaleSize(30) }} />
                        :
                        <Button style={{ justifyContent: 'center', width: scaleSize(280), height: scaleSize(118), backgroundColor: '#e64e37' }}

                            onPress={() => {
                                if (typeof plus === 'object') {
                                    this.appPayMember(params)
                                } else {
                                    this.payMember(params)
                                }

                            }}

                        >
                            <Text style={{ color: '#fff' }}>确认支付</Text>
                        </Button>}

                </Footer>
                {
                    this.state.isPassword && <Password
                        title={'输入支付密码'}
                        onBack={() => this.setState({ isPassword: false })}
                        onSubmit={(password) => {
                            this.passwordPay(password)
                        }

                        }
                        onGetPassword={(data) => { this.props.navigation.navigate('PayPassword') }}
                    />
                }
            </Container >
        );
    }
}

const mapStateToProps = state => ({
    userinfo: state.user.info,
    token: state.user.token,
    counter: state.counter.counter,
    openid: state.auth.buyopenid
})

export default connect(mapStateToProps, { saveMemberInfo, getPaySign })(Counter)

