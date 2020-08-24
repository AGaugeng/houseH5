/**
 * 1.就诊记录 -- 全部
 * https://github.com/facebook/react-native
 *
 * @Song
 * @flow
 */
import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, View, ImageBackground, TouchableOpacity, Image, StyleSheet } from "react-native"
import { Header, Left, Button, Body, Spinner, Container, List, Title, Right, Icon, Content } from "native-base"
import { getLogBalance } from '../../actions/log'
import {
    scaleSize,
    deviceHeight,
    deviceWidth,
    toDate
} from "../ScreenUtil"
import styles from "./styles"
class Counter extends Component {
    static propTypes = {
        getMessagesContent: PropTypes.func.isRequired,
        getLogBalance: PropTypes.func.isRequired,
        content: PropTypes.object.isRequired
    }
    static defaultProps = {
        content: {},
        pay: [],

    }
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            limit: 20,
            status: 0,
            refreshing: false

        }
    }
    _onEndReached = (info) => {

        if (this.props.pay.length === 0) {
            this.setState({ refreshing: true })
            this.setState({ page: 1 })
            this.setState({ limit: 20 })
            setTimeout(() => {
                this.getLogBalance()
            }, 200)
        } else {
            this.setState({ refreshing: true })
            this.setState({ page: this.state.page + 1 })
            this.setState({ limit: this.state.limit })
            setTimeout(() => {
                this.getLogBalance()
            }, 200)
        }

    }
    detail = (item) => {
        return (

            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('WithdrawDetail')}
                underlayColor="transparent" >
                <Text style={{ alignSelf: 'center', marginTop: scaleSize(36), marginBottom: scaleSize(36) }}>{toDate(item.time)}</Text>
                <View style={styles.pay}>
                    <Image
                        source={require("../../assets/message/pay@3x.png")}
                        style={{ width: scaleSize(80), height: scaleSize(80) }}
                    />
                    <View style={styles.hospital}>
                        <View style={styles.spaceBetween}>
                            <Text style={{ color: item.type === '1' ? "#e64e37" : '#d6112d', fontSize: 14, }}>{(item.type === '1' ? '+' : '-') + item.amount + '元'}</Text>

                        </View>
                        <View style={[styles.spaceBetween, { marginTop: scaleSize(20), width: deviceWidth * 0.6 }]}>
                            <Text style={styles.grade} >{item.note}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    componentWillMount() {
        this.getLogBalance()
    }

    getLogBalance() {
        this.props.getLogBalance(
            [
                { name: 'page', data: this.state.page },
                { name: 'limit', data: this.state.limit },

            ], this.state.page, () => this.setState({ refreshing: false })
        )
    }
    render() {
        return (
            <Container>
                <Header  >
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={{ color: '#000' }} name="ios-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#000' }}>支付消息</Title>
                    </Body>
                    <Right />
                </Header>

                <Content style={styles.paySection}>
                    {this.props.pay.length === 0 ?
                        <View style={styles.nocollet}>
                            <ImageBackground source={require("../../assets/message/noMsg@2x.png")} style={{
                                width: scaleSize(102),
                                height: scaleSize(117),
                                marginTop: deviceHeight / 4,
                                alignSelf: 'center',
                            }} />
                            <Text style={{ alignSelf: 'center', marginTop: scaleSize(36) }}>您还没有消息噢~！</Text>
                        </View>
                        :
                        <View>
                            <List
                                contentContainerStyle={{ marginBottom: scaleSize(36) }}
                                dataArray={this.props.pay}
                                renderRow={this.detail}
                                keyExtractor={(item, index) => index.toString()}
                            />

                            {this.state.refreshing ? <Spinner color="#e64e37" /> :
                                <TouchableOpacity onPress={
                                    this._onEndReached
                                } >
                                    <View style={{ alignSelf: 'center', marginTop: scaleSize(20), marginBottom: scaleSize(40) }}>
                                        <Text style={{
                                            color: this.state.isRental ? '#333' : '#999',

                                            fontSize: 14
                                        }}>点击加载更多...</Text>

                                    </View>
                                </TouchableOpacity>


                            }
                        </View>


                    }
                </Content>
            </Container>

        )
    }

}



const mapStateToProps = state => ({
    pay: state.balance.data,

})

export default connect(mapStateToProps, { getLogBalance })(Counter)