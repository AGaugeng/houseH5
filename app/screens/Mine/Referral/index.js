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
import { Image, Modal, View, TouchableOpacity } from "react-native"
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
    Text,
    ListItem
} from "native-base"
import styles from "./styles"
import { scaleSize, deviceWidth } from "../../ScreenUtil"
import MyModal from "./shareBottomModal"
import { getShareList, getRecommendCode } from '../../../actions/user'
import QRCode from 'qrcode.react'
import { Config } from '../../../network/'

// var sweixin = null;
var buttons = [
    { title: '我的好友', extra: { scene: 'WXSceneSession' } },
    { title: '朋友圈', extra: { scene: 'WXSceneTimeline' } },
    { title: '我的收藏', extra: { scene: 'WXSceneFavorite' } }
];
class Counter extends Component {
    static propTypes = {
        getRecommendCode: PropTypes.func.isRequired,

        // shareFriend: PropTypes.func.isRequired,
        // shareTimeline: PropTypes.func.isRequired,
        // shareQQ: PropTypes.func.isRequired,
        getShareList: PropTypes.func.isRequired,
        userinfo: PropTypes.object.isRequired,
        // location: PropTypes.object.isRequired,
        token: PropTypes.object.isRequired
    }
    static defaultProps = {
        userinfo: {},
        recommendcode: '',
        sharelist: {}
    }
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
    }
    shareWeb() {
        var msg = { type: 'web', thumbs: [Config.API_URL + '/image/logo_fzg.png'] };

        msg.href = Config.API_URL + '/api/weixin/index?state=' + this.props.recommendcode.code;

        msg.title = '房长官';

        msg.content = '您身边的房源共享平台';
        window.sweixin ? window.plus.nativeUI.actionSheet({ title: '分享网页到微信', cancel: '取消', buttons: buttons }, function (e) {
            (e.index > 0) && window.share(window.sweixin, msg, buttons[e.index - 1]);
        }) : window.plus.nativeUI.alert('当前环境不支持微信分享操作!');
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentWillMount() {

        this.props.getShareList()
        this.props.getRecommendCode()
    }
    render() {
        const recommendcode = this.props.recommendcode
        return (
            <Container style={styles.container}>
                <Header style={{ borderBottomColor: '#E6E6E5', borderBottomWidth: scaleSize(1) }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>推荐管理</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate('MyReferral')
                        }} >
                            <Title style={{ color: '#666', fontSize: 14 }}>我的推荐</Title>
                        </Button>

                    </Right>
                </Header>
                <Content>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert("Modal has been closed.");
                        }}
                    >
                        <MyModal >

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                                <Body style={{ marginTop: scaleSize(10), borderBottomColor: '#fff', alignSelf: 'center' }} >
                                    <Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold' }}>分享到</Text>
                                </Body>

                                <Button transparent onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                                    <Image
                                        source={require("../../../assets/login/close.png")}
                                        style={{ width: scaleSize(22), height: scaleSize(22), marginRight: scaleSize(36) }}
                                    />
                                </Button>
                            </View>
                            <View style={{
                                marginTop: scaleSize(90),
                                paddingLeft: scaleSize(50),
                                paddingRight: scaleSize(50),
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }} icon>
                                <TouchableOpacity transparent onPress={() => {
                                    // this.props.shareFriend()
                                    this.shareWeb()
                                }}>
                                    <Body style={{ borderBottomColor: '#fff', alignItems: 'center' }}>
                                        <Image
                                            source={require("../../../assets/mine/pyq/wx.png")}
                                            style={{ width: scaleSize(96), height: scaleSize(96) }}
                                        />
                                        <Text style={{ marginTop: scaleSize(25), fontSize: 15, color: '#000' }}>微信</Text>
                                    </Body>
                                </TouchableOpacity>
                                {/* <TouchableOpacity transparent onPress={() => {
                                    // this.props.shareTimeline()
                                }}>
                                    <Body style={{ borderBottomColor: '#fff', alignItems: 'center' }} >
                                        <Image
                                            source={require("../../../assets/mine/pyq/pyq@2x.png")}
                                            style={{ width: scaleSize(96), height: scaleSize(96) }}
                                        />
                                        <Text style={{ marginTop: scaleSize(25), fontSize: 15, color: '#000' }}>朋友圈</Text>
                                    </Body>
                                </TouchableOpacity> */}
                                <TouchableOpacity transparent onPress={() => {
                                    // this.props.shareQQ()
                                }}>
                                    <Body style={{ borderBottomColor: '#fff', alignItems: 'center' }}>
                                        <Image
                                            source={require("../../../assets/mine/pyq/qq.png")}
                                            style={{ width: scaleSize(96), height: scaleSize(96) }}
                                        />
                                        <Text style={{ marginTop: scaleSize(25), fontSize: 15, color: '#000' }}>QQ</Text>
                                    </Body>
                                </TouchableOpacity>
                            </View>
                        </MyModal>
                    </Modal>
                    <ListItem style={styles.share} icon>
                        <Left style={{ borderBottomColor: '#fff' }}>
                            <Image style={styles.img} source={require('../../../assets/mine/referral/fx@2x.png')}></Image>
                        </Left>
                        <Body style={{ borderBottomColor: '#fff' }} >
                            {typeof plus === 'object' ? <Text style={{ fontSize: 14, color: '#000' }}>点击下面“立即分享”按钮，通过微信/朋友圈发送链接给好友</Text> :
                                <Text style={{ fontSize: 14, color: '#000' }}>点击右上角“···”按钮，通过微信/朋友圈发送链接给好友</Text>
                            }
                        </Body>
                    </ListItem>
                    <ListItem style={styles.share} icon>
                        <Body style={{ borderBottomColor: '#fff' }} >
                            <Text style={{ fontSize: 14, color: '#000' }}>好友通过您的分享链接，并成功注册加入我们的会员，便推荐成功</Text>
                        </Body>
                        <Right style={{ borderBottomColor: '#fff' }}>
                            <Image style={styles.img} source={require('../../../assets/mine/referral/qd@2x.png')}></Image>
                        </Right>
                    </ListItem>
                    <ListItem style={styles.share} icon>
                        <Left style={{ borderBottomColor: '#fff' }}>
                            <Image style={styles.img} source={require('../../../assets/mine/referral/sy@2x.png')}></Image>
                        </Left>
                        <Body style={{ borderBottomColor: '#fff' }} >
                            <Text style={{ fontSize: 14, color: '#000' }}>系统确认后，将自动发送规定的奖金到您的账户</Text>
                        </Body>

                    </ListItem>
                    <View style={{ alignSelf: 'center', marginTop: scaleSize(50) }}>
                        <QRCode
                            size={150}
                            value={Config.API_URL + '/api/weixin/index?state=' + recommendcode.code} />

                        <Text style={{ textAlign: 'center', marginTop: 10 }}>
                            微信扫一扫
                        </Text>

                    </View>
                    {typeof plus === 'object' && <TouchableOpacity transparent onPress={() => {
                        // this.setModalVisible(!this.state.setModalVisible)
                        this.shareWeb()
                    }}  >
                        <button className='mine' style={{ width: scaleSize(577), marginLeft: deviceWidth / 2 - scaleSize(577) / 2, marginTop: scaleSize(50), marginBottom: scaleSize(50), height: scaleSize(80), borderRadius: scaleSize(40) }}>
                            <Text style={{ color: '#fff', fontSize: 14 }}>立即分享</Text>
                        </button>
                    </TouchableOpacity>}
                </Content>
            </Container >
        );
    }
}

const mapStateToProps = state => ({
    userinfo: state.user.info,
    recommendcode: state.user.recommendcode,
    sharelist: state.user.sharelist,
    wxload: state.wechat.wxload,

})

export default connect(mapStateToProps, {
    getShareList,
    // shareFriend, shareTimeline, shareQQ,
    getRecommendCode
})(Counter)
