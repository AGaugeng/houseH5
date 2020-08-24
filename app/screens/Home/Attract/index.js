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
import { TouchableOpacity, Image } from "react-native"
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

} from "native-base"
import styles from "./styles"

import View from '../../../tool/View'
import { scaleSize, deviceWidth } from "../../ScreenUtil"
// import { getShareList, getRecommendCode } from '../../../actions/user'
// import { wxShare, shareFriend, shareQQ, shareTimeline } from '../../../actions/wechat'
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
            modalVisible: false,
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentWillMount() {
    }
    render() {
        return (
            <Container style={styles.container}>
                <Header style={{ borderBottomColor: '#E6E6E5', borderBottomWidth: scaleSize(1) }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>综合信息</Title>
                    </Body>
                    <Right>
                        {/* <Button transparent onPress={() => {
                            this.props.navigation.navigate('MyReferral')
                        }} >
                            <Title style={{ color: '#666', fontSize: 14 }}>我的推荐</Title>
                        </Button> */}

                    </Right>
                </Header>
                <Content>

                    <View vcenter hcenter xlp>

                        <Image
                            source={require("../../../assets/loading/LOGO@2x.png")}
                            style={{ width: scaleSize(180), alignSelf: 'center', height: scaleSize(180) }}
                        />
                        <Text note style={{ fontSize: 14, margin: 5, color: '#e64e37', alignSelf: 'center' }}>暂未开放</Text>
                        {/* <Icon name='home' style={{ fontSize: 120, alignSelf: 'center', color: '#e64e37' }} /> */}

                    </View>
                    <TouchableOpacity transparent onPress={() => {
                        // this.setModalVisible(!this.state.setModalVisible)
                        this.props.navigation.goBack()
                    }}  >
                        <button className='mine' style={{ width: scaleSize(577), marginLeft: deviceWidth / 2 - scaleSize(577) / 2, marginTop: scaleSize(158), height: scaleSize(80), borderRadius: scaleSize(40) }}>
                            <Text style={{ color: '#fff', fontSize: 14 }}>返回</Text>
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
