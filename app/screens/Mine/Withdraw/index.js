/*
 * @Author: Song
 * @Date: 2018-10-23 17:00:10
 * @LastEditors: Song
 * @LastEditTime: 2018-12-14 10:47:33
 * @Description: 余额明细
 */

import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Card,
    Icon,
    ListItem,
    List,
    Left,
    Right,
    Body
} from "native-base"
import { View, Image } from "react-native"
import { getUserInfo } from '../../../actions/user'
import { getLogBalance } from '../../../actions/log'
import { scaleSize, deviceWidth, deviceHeight, toDate } from "../../ScreenUtil"
import styles from "./styles"
// import NearbyHospital from "../Home/nearbyHospital"
const none = require("../../../assets/mine/none/none@2x.png")
class Counter extends Component {
    static propTypes = {
        getLogBalance: PropTypes.func.isRequired,
        userinfo: PropTypes.object.isRequired,
        pay: PropTypes.object.isRequired
    }
    static defaultProps = {
        userinfo: {},
        pay: {}
    }
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    Balance = (item) => {

        return (
            <View icon style={{ margin: scaleSize(20), borderBottomWidth: scaleSize(1), borderBottomColor: '#eee' }}>
                <View >
                    <Text style={{
                        color: '#000',
                        marginLeft: scaleSize(14),
                        fontSize: 14
                    }}>{item.note}</Text>

                </View>
                <View style={{ flexDirection: 'row', marginTop: scaleSize(10), marginBottom: scaleSize(20), justifyContent: 'space-between' }}>
                    <Text style={{
                        color: "#999",
                        marginLeft: scaleSize(14),
                        fontSize: 14
                    }}>{toDate(item.time)}</Text>
                    <Text style={{
                        color: item.type === '1' ? "#e64e37" : '#d6112d',
                        fontWeight: 'bold',
                        marginLeft: scaleSize(14),
                        fontSize: 14
                    }}>{(item.type === '1' ? '+' : '-') + item.amount}</Text>

                </View>
            </View>
        )
    }
    render() {
        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: "#e64e37", borderBottomColor: '#e64e37' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#fff' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ color: '#fff', fontWeight: 'bold' }}>余额明细</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{ width: deviceWidth, backgroundColor: "#e64e37", height: scaleSize(172) }} />
                <Card style={{ position: 'absolute', zIndex: 99, top: scaleSize(150), left: scaleSize(36), width: deviceWidth - scaleSize(72), height: scaleSize(274), borderRadius: scaleSize(32) }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View>
                            <Text style={{
                                color: '#666',
                                alignSelf: 'center',
                                marginTop: scaleSize(76),
                                fontSize: 14
                            }}>账户余额（元）</Text>
                            <Text style={{
                                color: '#000',
                                fontWeight: 'bold',
                                alignSelf: 'center',
                                marginTop: scaleSize(30),
                                fontSize: 32
                            }}>{this.props.userinfo.balance}</Text>
                        </View>
                        <Button
                            transparent
                            bordered={true}
                            dark={true}
                            onPress={() => {
                                this.props.navigation.navigate('Withdraw')
                            }} style={{ alignSelf: 'center', borderColor: '#333', marginTop: scaleSize(145) / 2, height: scaleSize(60), borderRadius: scaleSize(30) }}>
                            <Text style={{ color: '#333', textAlign: 'center', fontSize: 14 }}>提现</Text>
                        </Button>
                    </View>
                </Card>

                <Content >

                    <ListItem icon style={{ marginTop: scaleSize(150), flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Left>
                            <View style={{
                                width: scaleSize(6), height: scaleSize(24),
                                backgroundColor: '#84B7FA',
                                borderRadius: scaleSize(3),
                            }} />
                            <Text style={{
                                color: '#000',
                                fontWeight: 'bold',
                                marginLeft: scaleSize(14),
                                fontSize: 16
                            }}>余额明细</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', borderBottomColor: '#fff' }} />
                    </ListItem>
                    {this.props.pay.length === 0 ?
                        <View style={{ marginTop: deviceHeight / 5, alignSelf: "center", alignItems: 'center' }}>
                            <Image source={none} style={styles.noneImg}></Image>
                            <Text style={{ color: '#999', fontSize: 14 }}>暂无余额明细</Text>
                        </View>
                        :
                        <List
                            contentContainerStyle={styles.sectionNear}
                            dataArray={this.props.pay}
                            renderRow={this.Balance}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    }

                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    userinfo: state.user.info,
    pay: state.balance.data,
})

export default connect(mapStateToProps, { getUserInfo, })(Counter)

