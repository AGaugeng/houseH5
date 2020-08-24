/**
 * 会员中心
 * https://github.com/facebook/react-native-web
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, ImageBackground, TouchableOpacity } from "react-native"
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
    ListItem,
    List
} from "native-base"
import styles from "./styles"
import View from "../../View"
import { scaleSize } from "../../ScreenUtil"
import { getUserLevel } from '../../../actions/user'
import { getAreaBrother } from '../../../actions/location'

import { getPaySign } from '../../../actions/wechat'
class Counter extends Component {
    static propTypes = {
        getUserLevel: PropTypes.func.isRequired,
        getAreaBrother: PropTypes.func.isRequired,
        level: PropTypes.object.isRequired,

    }
    static defaultProps = {
        level: { rule: [] },

    }
    constructor(props) {
        super(props)
        // const { params } = this.props.navigation.state || 0

        this.state = {

        }
    }
    componentWillMount() {

        this.props.getUserLevel()
        this.props.getAreaBrother([
            { name: 'province', data: '广东省' },
            { name: 'city', data: '中山市' },
            { name: 'town', data: '古镇镇' }
        ])

    }
    server = (item) => {
        return (
            <ImageBackground
                source={item.name === '普通会员' ? require("../../../assets/mine/vip/vip1@3x.png") :
                    item.name === '高级会员' ? require("../../../assets/mine/vip/vip2@3x.png") :
                        require("../../../assets/mine/vip/vip@3x.png")
                } style={styles.bgImg}
            >
                <View row push mdp>
                    <View hstart>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}><Text style={{ fontSize: 12, color: '#fff', marginRight: scaleSize(13) }}>￥</Text>{item.price}</Text>
                        <Text style={{ fontSize: 14, color: '#fff', marginTop: scaleSize(20) }}>{item.intro}</Text>
                    </View >


                    <View hcenter>
                        <Text style={{ fontSize: 14, color: '#fff' }}>{item.name}</Text>

                        <button onClick={() => {
                            if (!this.props.userinfo.id_card) {
                                this.props.navigation.navigate('MemberProfile', item)
                            } else {
                                this.props.navigation.navigate('MemberJoin', item)
                            }

                        }} style={{ marginTop: scaleSize(20), height: scaleSize(48), backgroundColor: '#fff', borderRadius: scaleSize(24) }}>
                            <Text style={{ color: '#000', fontSize: 12 }}>立即购买</Text>
                        </button>
                    </View >

                </View>
            </ImageBackground >
        )
    }

    render() {

        const item = this.props.member
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>会员中心</Title>
                    </Body>
                    <Right>
                        {/* <Text style={{
                            color: '#666',
                            fontSize: setSpText(12)
                        }}>我的会员</Text> */}
                    </Right >
                </Header>
                <Content>
                    <List
                        contentContainerStyle={styles.sectionNear}
                        dataArray={item.level}
                        renderRow={this.server}
                        keyExtractor={(item, index) => index.toString()}
                    />


                    <ListItem icon style={{ marginTop: scaleSize(36), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left>
                            <Text style={{
                                color: '#000',
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>会员规则</Text>
                        </Left>
                        <Right style={{ borderBottomColor: '#fff' }} >
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('RegProtocol', { type: 'member' })
                            }}>
                                <Text style={{
                                    color: '#e64e37',
                                    fontSize: 14
                                }}>推广奖励规则</Text>
                            </TouchableOpacity>
                            <Icon style={{ fontSize: 20, color: '#ccc', marginTop: -scaleSize(5) }} name="ios-arrow-forward" />
                        </Right>
                    </ListItem>
                    <View>
                        {item.rule.length !== 0 && item.rule.map((item, index) => {
                            return (
                                <Text key={index} style={{ marginTop: 10, marginLeft: 10, marginRight: 10, color: '#666', fontSize: 14 }}>
                                    <Image
                                        source={require("../../../assets/mine/vip/dot@3x.png")} style={styles.dotImg}
                                    />
                                    {item}
                                </Text>

                            )
                        })
                        }
                    </View>


                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    member: state.user.level,
    userinfo: state.user.info
})

export default connect(mapStateToProps, { getUserLevel, getAreaBrother, getPaySign })(Counter)

